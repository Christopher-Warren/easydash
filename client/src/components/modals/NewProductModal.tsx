import InfoCard from '../cards/InfoCardSmall'
import ModalContainer from './ModalContainer'

import {
  useQuery,
  gql,
  useLazyQuery,
  useMutation,
  QueryResult,
} from '@apollo/client'
import FormInput from '../LoginInput'
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

/* 
  This module has two actions
  1) Create a new product
  2) Edit a preexisting product, checked via productId

*/

const NewProductModal = ({
  products,
  productId,
}: {
  products: QueryResult
  productId?: string
}) => {
  const { refetch } = products
  const { data, loading, error } = useQuery(gql`
    query getCategories($category: String) {
      categories(category: $category) {
        name
        products {
          _id
        }
        subcategories {
          name
        }
      }
    }
  `)

  const [createProduct, { data: createdProduct }] = useMutation(gql`
    mutation createProduct(
      $name: String!
      $category: String!
      $description: String!
      $price: Float!
      $subcategory: String!
      $stock: Float!
    ) {
      createProduct(
        productInput: {
          name: $name
          category: $category
          description: $description
          price: $price
          subcategory: $subcategory
          stock: $stock
        }
      ) {
        _id
        name
        description
        price
        stock
        subcategory {
          name
        }
      }
    }
  `)

  const [modifyProduct, { data: modifyProductData }] = useMutation(gql`
    mutation modifyProduct(
      $_id: ID!
      $name: String
      $category: String
      $description: String
      $price: Float
      $subcategory: String
      $stock: Float
    ) {
      modifyProduct(
        productInput: {
          _id: $_id
          name: $name
          category: $category
          description: $description
          price: $price
          subcategory: $subcategory
          stock: $stock
        }
      ) {
        _id
        name
        description
        price
        stock
        subcategory {
          _id
          name
        }
        category {
          name
          _id
        }
      }
    }
  `)

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

  // Temp preview image
  const [selectedImg, setSelectedImg] = useState(0)
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

  // Event Handlers
  const handleFileOnChange = (e: any) => {
    setImgUrls((prev) => {
      const fileInput = document.getElementById('file_input') as any
      const images = fileInput && Object.values(fileInput.files)

      const newImages = images.map((image: any) => {
        return URL.createObjectURL(image)
      })
      const newarr = prev.concat(newImages)

      return newarr
    })
  }

  const dispatch = useAppDispatch()

  const handleCategorySelect = (e: any) => {
    const selectedIndex = e.target.options.selectedIndex

    if (selectedIndex < data.categories.length) {
      // If selecting valid category
      setSelectedCategory(selectedIndex)
      setNewCategoryInput('')

      // Resets subcategory <Select />
      setSubcategory('')
    } else {
      // If selecting new category

      setSelectedCategory(-1)
      setSubcategory('new-subcategory')
    }
    // Handle case where Category has no Subcategories
    if (data.categories[selectedIndex]?.subcategories.length === 0) {
      setSubcategory('new-subcategory')
    }

    setCategory(e.currentTarget.value)
  }

  const handleSubcategorySelect = (e: any) => {
    const selectedIndex = e.currentTarget.options.selectedIndex

    if (selectedIndex < data.categories.length) {
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
        .then(({ data }) => {
          const formData = new FormData()
          const fileInput = document.getElementById('file_input') as any
          const images = fileInput && Object.values(fileInput.files)

          images.forEach((file: any) => {
            formData.append('photos', file)
          })

          axios
            .post('/api/image', formData, {
              headers: {
                productid: data.modifyProduct._id,
              },
              onUploadProgress: (prog) => {
                console.log(prog.p)

                setProgress((prog.loaded / prog.total) * 100)
              },
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
        .then(({ data }) => {
          axios
            .post('/api/image', formData, {
              headers: {
                productid: data.createProduct._id,
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
    if (data.categories[selectedCategory] === undefined) {
      return (
        <option
          value="new-subcategory"
          onClick={(e) => setSubcategory(e.currentTarget.value)}
        >
          New Subcategory
        </option>
      )
    }

    return data.categories[selectedCategory]?.subcategories.map(
      (subcategory: any, index: number, arr: any) => {
        return (
          <Fragment key={index}>
            <option>{subcategory.name}</option>
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
    return data.categories.map((category: any, index: number) => {
      return (
        <Fragment key={index}>
          <option>{category.name}</option>
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
            className=" h-20 w-20 object-cover "
            onClick={(e) => setSelectedImg(index)}
            src={url}
            alt="img"
          ></img>
        </Fragment>
      )
    })

    return (
      <div className="md:col-span-2 col-span-full row-span-6 grid grid-cols-12 h-fit">
        <img
          className="col-span-9 w-full h-64 object-cover "
          src={imgUrls[selectedImg] || img}
          alt="img"
        ></img>
        <div className="col-span-3 h-64  overflow-y-auto overflow-x-none">
          {images}
        </div>
        <input
          className="col-span-full file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 w-full 
              file:text-sm file:font-semibold 
              file:bg-violet-50 file:text-purple-700
              hover:file:bg-purple-100"
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
    if (data && data.categories[0] && pageLoads.current < 1) {
      pageLoads.current++

      if (selectedProduct) {
        setCategory(selectedProduct.category.name)
        setSubcategory(selectedProduct.subcategory.name)
        const categoryIndex = data.categories.findIndex((el: any) => {
          return el.name === selectedProduct.category.name
        })

        if (selectedProduct.images.length > 0)
          setImgUrls(selectedProduct.images)

        setSelectedCategory(categoryIndex)
      } else {
        setCategory(data.categories[0].name)
        setSubcategory(data.categories[0].subcategories[0].name)
      }
    }

    if (data && !data.categories[0] && pageLoads.current < 1) {
      setCategory('new-category')
      setSubcategory('new-subcategory')
    }
  }, [data, selectedProduct])

  const closePromptOpts = {
    title: 'Are you sure you wish to go back?',
    body: 'All changes will be lost',
    confirm: 'Back',
    cancel: 'Stay',
  }

  return (
    <ModalContainer
      size="max-w-3xl"
      hasChanges={hasChanges}
      opts={closePromptOpts}
    >
      <div className="w-full left-0 z-30 modal-anims">
        <InfoCardLarge
          title={productId ? 'Edit Product' : 'Create a New Product'}
        >
          <form
            className="grid grid-cols-4  gap-x-10 gap-y-10"
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

            <div className="grid gap-10 md:col-span-2 col-span-full">
              <SelectPrimary
                id="category-select"
                className=""
                value={category}
                onChange={handleCategorySelect}
              >
                {data && renderCategories()}
                <option value="new-category">New Category</option>
              </SelectPrimary>

              <TextInput
                className="  "
                name="new cat"
                placeholder="New Category"
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.currentTarget.value)}
                disabled={category !== 'new-category'}
                required
              ></TextInput>
            </div>
            {/* Subcategory */}
            <div className="grid gap-10 md:col-span-2 col-span-full">
              <SelectPrimary
                id="subcategory-select"
                className=""
                value={subcategory}
                onChange={handleSubcategorySelect}
              >
                {data && renderSubcategories()}
              </SelectPrimary>
              <TextInput
                className=""
                name="new cat"
                placeholder="New Subcategory"
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

            <div className="col-span-full flex justify-between">
              <SecondaryButton
                red
                padding="px-10 py-2"
                onClick={(e: any) => {
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
          <progress max="100" value={progress}></progress>
        </InfoCardLarge>
      </div>
    </ModalContainer>
  )
}

export default NewProductModal
