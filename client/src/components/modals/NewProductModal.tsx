import InfoCard from '../cards/InfoCard'
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

import img from '../../assets/feather/image.svg'
import SecondaryButton from '../buttons/SecondaryButton'
import SelectPrimary from '../inputs/SelectPrimary'
import TextInput from '../inputs/TextInput'
import TextArea from '../inputs/TextArea'

const NewProductModal = ({ products }: { products: QueryResult }) => {
  const { refetch } = products
  const { data, loading, error } = useQuery(gql`
    query getCategories($category: String) {
      categories(category: $category) {
        name
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

  const [selectedCategory, setSelectedCategory] = useState(0)
  const [newCategoryInput, setNewCategoryInput] = useState<any>('')
  const [newSubCategoryInput, setNewSubCategoryInput] = useState<any>('')
  // State for Form Data

  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  // Track page loads
  const pageLoads = useRef(0)

  // Experimental

  // Temp preview image
  const [selectedImg, setSelectedImg] = useState(0)
  const [imgUrls, setImgUrls] = useState([img])

  // Event Handlers
  const handleFileOnChange = (e: any) => {
    setImgUrls((prev) => {
      const arr: any = []

      const fileInput = document.getElementById('file_input') as any
      const images = fileInput && Object.values(fileInput.files)

      images.forEach((image: any) => {
        arr.push(URL.createObjectURL(image))
      })
      return arr
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
        axios.post('/api/image', formData, {
          headers: {
            productid: data.createProduct._id,
          },
        })
      })
      .then(() => {
        dispatch(toggleModal(null))
        refetch()
        dispatch(addError('Product successfully created.'))
      })
      .catch((err) => console.log('ERROR: ', err))
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

  const renderImagePreview2 = () => {
    if (!imgUrls) return

    const images = imgUrls.map((url, index) => {
      return (
        <Fragment key={index}>
          <img
            className=" h-20 w-20 object-cover"
            onClick={(e) => setSelectedImg(index)}
            src={url}
            alt="img"
          ></img>
        </Fragment>
      )
    })

    return (
      <div className="col-span-2 row-span-6 grid grid-cols-12">
        <img
          className="col-span-9 w-full h-64 object-cover"
          src={imgUrls[selectedImg]}
          alt="img"
        ></img>
        <div className="col-span-3 h-64  overflow-y-auto overflow-x-none">
          {images}
        </div>
      </div>
    )
  }

  // Initialize Async State
  useEffect(() => {
    if (data && data.categories[0] && pageLoads.current < 1) {
      pageLoads.current++
      setCategory(data.categories[0].name)
      setSubcategory(data.categories[0].subcategories[0].name)
    }
    if (data && !data.categories[0] && pageLoads.current < 1) {
      setCategory('new-category')
      setSubcategory('new-subcategory')
    }
  }, [data])

  return (
    <ModalContainer size="max-w-3xl">
      <div className="w-full left-0 z-30 modal">
        <InfoCard p="px-10 py-10" title="New Product">
          <form
            className="grid grid-cols-4  gap-x-4 gap-y-4 mt-4"
            onSubmit={handleFormSubmit}
          >
            <TextInput
              autoFocus
              placeholder="name"
              className="col-span-full self-center"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            ></TextInput>

            <div className="row-span-3 grid gap-3 md:col-span-2 col-span-full">
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
                placeholder="Enter New Category"
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.currentTarget.value)}
                disabled={category !== 'new-category'}
                required
              ></TextInput>
            </div>
            {/* Subcategory */}
            <div className=" row-span-3 grid gap-3 md:col-span-2 col-span-full">
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
                value={newSubCategoryInput}
                onChange={(e) => setNewSubCategoryInput(e.currentTarget.value)}
                disabled={subcategory !== 'new-subcategory'}
                required
              ></TextInput>
            </div>

            {renderImagePreview2()}

            <TextInput
              className="row-span-1"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(parseInt(e.currentTarget.value))}
            ></TextInput>
            <TextInput
              className="row-span-1"
              placeholder="stock"
              value={stock}
              onChange={(e) => setStock(parseInt(e.currentTarget.value))}
            ></TextInput>
            <TextArea
              placeholder="Description"
              className=""
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            ></TextArea>

            <input
              className="col-span-2"
              id="file_input"
              type="file"
              multiple
              accept=".jpg,.gif,.jpeg,.png"
              onChange={handleFileOnChange}
            ></input>

            <SecondaryButton red padding="py-2" className="col-start-1">
              Back
            </SecondaryButton>
            <PrimaryButton
              padding="py-2 "
              type="submit"
              className="col-start-4"
            >
              Create
            </PrimaryButton>
          </form>
        </InfoCard>
      </div>
    </ModalContainer>
  )
}

export default NewProductModal
