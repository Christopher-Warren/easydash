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
  const [name, setName] = useState('potato')
  const [description, setDescription] = useState('yum')
  const [price, setPrice] = useState(12)
  const [stock, setStock] = useState(10)

  // Track page loads
  const pageLoads = useRef(0)

  // Experimental

  // Temp preview image
  const [selectedImg, setSelectedImg] = useState(0)
  const [imgUrls, setImgUrls] = useState([])

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

  const renderImagePreview = () => {
    return (
      imgUrls &&
      imgUrls.map((url, index) => {
        return (
          <Fragment key={index}>
            {index === 0 && (
              <img
                className="object-contain w-full"
                src={imgUrls[selectedImg]}
                alt="img"
              ></img>
            )}
            <div className="border border-purple-400">
              <img
                className="w-1/4 aspect-square inline object-contain"
                onClick={(e) => setSelectedImg(index)}
                src={url}
                alt="img"
              ></img>
            </div>
          </Fragment>
        )
      })
    )
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
      <div className="col-span-2 grid grid-cols-12">
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
    <ModalContainer size="3xl">
      <div className="w-full left-0 z-30 modal ">
        <InfoCard title="New Product">
          <form
            className="grid grid-cols-4 gap-3 my-4"
            onSubmit={handleFormSubmit}
          >
            <input
              autoFocus
              placeholder="name"
              className="col-span-full order-first"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            ></input>

            <div className="row-span-3 grid gap-3 md:col-span-2 col-span-full">
              <label htmlFor="category-select" className="block">
                Select a category
              </label>
              <select
                id="category-select"
                className="w-full"
                value={category}
                onChange={handleCategorySelect}
              >
                {data && renderCategories()}
                <option value="new-category">New Category</option>
              </select>

              <input
                className="bg-gray-600 disabled:opacity-40 w-full"
                name="new cat"
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.currentTarget.value)}
                disabled={category !== 'new-category'}
                required
              ></input>
            </div>
            {/* Subcategory */}
            <div className=" row-span-3 grid gap-3 md:col-span-2 col-span-full">
              <label htmlFor="subcategory-select" className="">
                Select a category
              </label>
              <select
                id="subcategory-select"
                className=""
                value={subcategory}
                onChange={handleSubcategorySelect}
              >
                {data && renderSubcategories()}
              </select>
              <input
                className="bg-gray-600 disabled:opacity-40"
                name="new cat"
                value={newSubCategoryInput}
                onChange={(e) => setNewSubCategoryInput(e.currentTarget.value)}
                disabled={subcategory !== 'new-subcategory'}
                required
              ></input>
            </div>

            <input
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(parseInt(e.currentTarget.value))}
            ></input>
            <input
              placeholder="stock"
              value={stock}
              onChange={(e) => setStock(parseInt(e.currentTarget.value))}
            ></input>

            <textarea
              placeholder="description"
              className="col-span-2 row-span-2 resize-none"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            ></textarea>

            {renderImagePreview2()}

            <input
              className="col-span-full"
              id="file_input"
              type="file"
              multiple
              accept=".jpg,.gif,.jpeg,.png"
              onChange={handleFileOnChange}
            ></input>

            <PrimaryButton type="submit" className="">
              CREATE
            </PrimaryButton>
          </form>
        </InfoCard>
      </div>
    </ModalContainer>
  )
}

export default NewProductModal
