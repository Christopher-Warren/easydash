import ModalContainer from './ModalContainer'

import { useQuery, useMutation, QueryResult } from '@apollo/client'

import { Fragment, useEffect, useRef, useState } from 'react'

import { toggleModal } from '../../redux/modal/modalSlice'
import { addError } from '../../redux/error/errorSlice'
import { useAppDispatch } from '../../redux/hooks'

import axios from 'axios'
import PrimaryButton from '../buttons/PrimaryButton'

// initial state for images
import img from '../../assets/feather/image.svg'
import SecondaryButton from '../buttons/SecondaryButton'
import SelectPrimary from '../inputs/SelectPrimary'
import TextInput from '../inputs/TextInput'
import TextArea from '../inputs/TextArea'
import InfoCardLarge from '../cards/InfoCardLarge'
import customPrompt from '../../utils/customPrompt'
import Progress from '../progress/Progress'
import usePrompt from '../../hooks/useHasStateChanged'
import { CREATE_PRODUCT, MODIFY_PRODUCT } from '../../graphql/mutation_vars'
import { GET_ALL_CATEGORIES } from '../../graphql/query_vars'

/* 
  This module has two actions
  1) Create a new product
  2) Edit a preexisting product, checked via productId

*/

interface CategoryTypes {
  getAllCategories: any[]
}

const NewProductModal = ({
  products,
  productId,
}: {
  products: QueryResult
  productId?: string
}) => {
  const { refetch } = products
  const { data } = useQuery(GET_ALL_CATEGORIES)

  const [createProduct] = useMutation(CREATE_PRODUCT)

  const [modifyProduct] = useMutation(MODIFY_PRODUCT)

  // Gets data for the currently selected product
  // if the user is editing a preexisting one.
  const [selectedProduct] = products.data.products.filter(
    (val: any, index: any) => {
      return val._id === productId
    },
  )

  const [selectedCategory, setSelectedCategory] = useState(0)
  const [newCategoryInput, setNewCategoryInput] = useState<any>('')
  const [newSubCategoryInput, setNewSubCategoryInput] = useState<any>('')
  // State for Form Data
  // When a product is selected, state will initialize
  // to its data
  const [name, setName] = useState(selectedProduct?.name || '')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [description, setDescription] = useState(
    selectedProduct?.description || '',
  )
  const [price, setPrice] = useState(selectedProduct?.price || 0)
  const [stock, setStock] = useState(selectedProduct?.stock || 0)

  // State to track upload progress
  const [progress, setProgress] = useState(0)

  // Track page loads
  const pageLoads = useRef(0)

  // State to manage deletion of images
  const [selectedImgs, setSelectedImgs] = useState([])
  // Temp preview image
  const [imgUrls, setImgUrls] = useState([])

  // Monitor changes to conditionally
  // render a customPrompt
  let hasChanges = false

  if (selectedProduct) {
    // Check changes for simple state
    if (name !== selectedProduct.name) hasChanges = true
    if (price !== selectedProduct.price) hasChanges = true
    if (stock !== selectedProduct.stock) hasChanges = true
    if (description !== selectedProduct.description) hasChanges = true

    // Check changes for complex state
    if (category) {
      if (category !== selectedProduct.category.name) hasChanges = true
    }

    if (subcategory) {
      if (subcategory !== selectedProduct.subcategory.name) hasChanges = true
    }
  } else {
    // When creating a new product, check for
    // appropriate changes
    if (name || price || description) {
      hasChanges = true
    }

    if (imgUrls[0]) hasChanges = true
  }

  console.log(selectedCategory, category)

  console.log(data.getAllCategories.name)

  // const hasChanged = usePrompt(
  //   [name, price, stock, description, selectedCategory],
  //   selectedProduct,
  // )

  // Event Handlers
  const handleFileOnChange = (e: any) => {
    const fileInput = document.getElementById('file_input') as any
    const images = fileInput && Object.values(fileInput.files)

    // TODO: Make an area for images selection
    const newImages = images.map((image: any) => {
      return URL.createObjectURL(image)
    })
  }

  const dispatch = useAppDispatch()

  const handleCategorySelect = (e: any) => {
    const selectedIndex = e.target.options.selectedIndex

    if (selectedIndex < data.getAllCategories.length) {
      // If selecting valid category
      setSelectedCategory(selectedIndex)
      setNewCategoryInput('')

      // Resets subcategory <Select />

      const subcategoryOfCategory = data.getAllCategories.find((obj: any) => {
        return obj.name === e.currentTarget.value.toLowerCase()
      })

      setSubcategory(subcategoryOfCategory.subcategories[0].name)
    } else {
      // If selecting new category

      setSelectedCategory(-1)
      setSubcategory('new-subcategory')
    }
    // Handle case where Category has no Subcategories
    if (data.getAllCategories[selectedIndex]?.subcategories.length === 0) {
      setSubcategory('new-subcategory')
    }

    setCategory(e.currentTarget.value)
  }

  const handleSubcategorySelect = (e: any) => {
    const selectedIndex = e.currentTarget.options.selectedIndex

    if (selectedIndex < data.getAllCategories.length) {
      setNewCategoryInput('')
    }
    setSubcategory(e.currentTarget.value)
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()

    if (productId) {
      // If a productId exists, we know we are updating
      // a previously created product.

      modifyProduct({
        variables: {
          _id: productId,
          name,
          category: newCategoryInput ? newCategoryInput : category,
          subcategory: newSubCategoryInput ? newSubCategoryInput : subcategory,
          description,
          price,
          stock,
        },
      })
        .then(async ({ data }) => {
          const formData = new FormData()
          const fileInput = document.getElementById('file_input') as any
          const images = fileInput && Object.values(fileInput.files)

          images.forEach((file: any) => {
            formData.append('photos', file)
          })

          await axios
            .post('/api/image', formData, {
              headers: {
                productid: data.modifyProduct._id,
              },
              onUploadProgress: (prog) => {
                setProgress((prog.loaded / prog.total) * 100)
              },
            })
            .then(async () => {
              if (selectedImgs.length > 0) {
                await axios.post('/api/image/delete', selectedImgs, {
                  headers: {
                    productid: selectedProduct._id,
                  },
                })
              }
            })
            .then(() => {
              dispatch(toggleModal({ value: null }))
              refetch()
              dispatch(addError('Product successfully changed.'))
            })
        })

        .catch((err) => console.log('ERROR: ', err))
    } else {
      // No productId, create a new product
      const formData = new FormData()
      const fileInput = document.getElementById('file_input') as any
      const images = fileInput && Object.values(fileInput.files)

      images.forEach((file: any) => {
        formData.append('photos', file)
      })

      createProduct({
        variables: {
          name,
          category: newCategoryInput ? newCategoryInput : category,
          subcategory: newSubCategoryInput ? newSubCategoryInput : subcategory,
          description,
          price,
          stock,
        },
      })
        .then(async ({ data }) => {
          // Upload images
          await axios
            .post('/api/image', formData, {
              headers: {
                productid: data.createProduct._id,
              },
              onUploadProgress: (prog) => {
                setProgress((prog.loaded / prog.total) * 100)
              },
            })

            .then(() => {
              dispatch(toggleModal({ value: null }))
              refetch()
              dispatch(addError('Product successfully created.'))
            })
        })

        .catch((err) => console.log('ERROR: ', err))
    }
  }

  // Render Methods
  const renderSubcategories = () => {
    if (data.getAllCategories[selectedCategory] === undefined) {
      return (
        <option
          value="new-subcategory"
          onClick={(e) => setSubcategory(e.currentTarget.value)}
        >
          New Subcategory
        </option>
      )
    }

    return data.getAllCategories[selectedCategory]?.subcategories.map(
      (subcategory: any, index: number, arr: any) => {
        return (
          <Fragment key={index}>
            <option>
              {subcategory.name.charAt(0).toUpperCase() +
                subcategory.name.slice(1)}
            </option>
            {index === arr.length - 1 && (
              <option
                value="new-subcategory"
                onClick={(e) => setSubcategory(e.currentTarget.value)}
              >
                New Subcategory
              </option>
            )}
          </Fragment>
        )
      },
    )
  }

  const renderCategories = () => {
    return data.getAllCategories.map((category: any, index: number) => {
      return (
        <Fragment key={index}>
          <option className="">{category.name}</option>
        </Fragment>
      )
    })
  }

  const renderImagePreview = () => {
    if (!imgUrls) return

    const images = imgUrls.map((url, index) => {
      return (
        <Fragment key={index}>
          <img
            className={` h-20 w-20  object-cover ${
              selectedImgs.includes(url) && 'border-red-500 border-8'
            }`}
            onClick={(e) => {
              if (selectedImgs.includes(url)) {
                setSelectedImgs((prev) => {
                  return prev.filter((val) => val !== url)
                })
              } else {
                setSelectedImgs([...selectedImgs, url])
              }
            }}
            src={url}
            alt="img"
          ></img>
        </Fragment>
      )
    })

    return (
      <div className="md:col-span-2 col-span-full row-span-6 grid grid-cols-12 h-fit">
        <img
          className="col-span-9 w-full h-64 object-cover"
          src={imgUrls[0] || img}
          alt="img"
        ></img>
        <div className="col-span-3 h-64  overflow-y-auto overflow-x-none ">
          {images}
        </div>

        <input
          className="col-span-full my-4 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 w-full 
              file:text-sm file:font-semibold 
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100
              dark:file:bg-purple-600 dark:file:text-purple-50
              "
          id="file_input"
          type="file"
          multiple
          accept=".jpg,.gif,.jpeg,.png"
          onChange={handleFileOnChange}
        ></input>
      </div>
    )
  }

  // Initialize Async State
  useEffect(() => {
    if (
      data.getAllCategories &&
      data.getAllCategories[0] &&
      pageLoads.current < 1
    ) {
      pageLoads.current++

      // This could be done better.
      // We are currently setting the inital state of the selected product's
      // category and subcategory to the value rendered in options, where
      // the shown data is parsed to look better by making the first
      // character uppercase, we need to allow for products to be able
      // to have any combination of upper/lower characters.
      if (selectedProduct) {
        setCategory(
          selectedProduct.category.name.charAt(0).toUpperCase() +
            selectedProduct.category.name.slice(1),
        )

        setSubcategory(
          selectedProduct.subcategory.name.charAt(0).toUpperCase() +
            selectedProduct.subcategory.name.slice(1),
        )
        const categoryIndex = data.getAllCategories.findIndex((el: any) => {
          return el.name === selectedProduct.category.name
        })

        if (selectedProduct.images.length > 0)
          setImgUrls(selectedProduct.images)

        setSelectedCategory(categoryIndex)
      } else {
        setCategory(data.getAllCategories[0].name)
        setSubcategory(data.getAllCategories[0].subcategories[0].name)
      }
    }

    if (
      data.getAllCategories &&
      !data.getAllCategories[0] &&
      pageLoads.current < 1
    ) {
      setCategory('new-category')
      setSubcategory('new-subcategory')
    }
  }, [data.getAllCategories, selectedProduct])

  const closePromptOpts = {
    title: 'Are you sure you wish to go back?',
    body: 'All changes will be lost',
    confirm: 'Back',
    cancel: 'Stay',
  }

  return (
    <ModalContainer
      size="max-w-3xl"
      hasChanged={hasChanges}
      opts={closePromptOpts}
    >
      <div className="w-full left-0 z-30 modal-anims  transition-all duration-100">
        <InfoCardLarge
          title={productId ? 'Edit Product' : 'Create a New Product'}
        >
          <form
            id="newProductForm"
            className="grid grid-cols-4  gap-10"
            onSubmit={handleFormSubmit}
          >
            <TextInput
              autoFocus
              placeholder="Name"
              id="name"
              containerClassName="col-span-full"
              // className="col-span-full self-center"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            ></TextInput>

            <div className="md:col-span-2 col-span-full  transition-all duration-100">
              <SelectPrimary
                id="category-select"
                className=""
                value={category}
                onChange={handleCategorySelect}
                label="Category"
              >
                {data.getAllCategories && renderCategories()}
                <option value="new-category">New Category</option>
              </SelectPrimary>

              <TextInput
                containerClassName="mt-5"
                placeholder={category !== 'new-category' ? '' : 'New Category'}
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.currentTarget.value)}
                disabled={category !== 'new-category'}
                required
              ></TextInput>
            </div>
            {/* Subcategory */}
            <div className="  md:col-span-2 col-span-full">
              <SelectPrimary
                id="subcategory-select"
                value={subcategory}
                onChange={handleSubcategorySelect}
                label="Subcategory"
              >
                {data.getAllCategories && renderSubcategories()}
              </SelectPrimary>
              <TextInput
                containerClassName="mt-5"
                placeholder={
                  subcategory !== 'new-subcategory' ? '' : 'New Subcategory'
                }
                value={newSubCategoryInput}
                onChange={(e) => setNewSubCategoryInput(e.currentTarget.value)}
                disabled={subcategory !== 'new-subcategory'}
                required
              ></TextInput>
            </div>

            {renderImagePreview()}

            <TextInput
              containerClassName="col-span-2 md:col-span-1"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(parseInt(e.currentTarget.value))}
            ></TextInput>
            <TextInput
              containerClassName="col-span-2 md:col-span-1"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(parseInt(e.currentTarget.value))}
            ></TextInput>
            <TextArea
              placeholder="Description"
              containerClassName="row-span-6 md:col-span-2 col-span-full"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            ></TextArea>
            <Progress className="col-span-full" progress={progress}></Progress>

            <div className="col-span-full flex justify-between">
              <SecondaryButton
                red
                padding="px-10 py-2"
                onClick={(e: any) => {
                  e.preventDefault()
                  const dispatchToggle = () => {
                    dispatch(toggleModal({ value: null }))
                  }

                  if (hasChanges) customPrompt(closePromptOpts, dispatchToggle)
                  if (!hasChanges) dispatchToggle()
                }}
              >
                Back
              </SecondaryButton>
              <PrimaryButton padding="px-10 py-2" type="submit">
                {selectedProduct ? 'Save' : 'Create'}
              </PrimaryButton>
            </div>
          </form>
        </InfoCardLarge>
      </div>
    </ModalContainer>
  )
}

export default NewProductModal
