import InfoCard from '../InfoCard'
import ModalContainer from './ModalContainer'

import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client'
import FormInput from '../FormInput'
import { Fragment, useEffect, useRef, useState } from 'react'

import axios from 'axios'

const NewProductModal = () => {
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

    // this should throw an error
    // formData.append('photos', fileInput.files)

    createProduct({
      variables: {
        name,
        category: newCategoryInput ? newCategoryInput : category,
        subcategory: newSubCategoryInput ? newCategoryInput : subcategory,
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
      .catch((err) => console.log('ERROR: ', err))
  }

  // Render Methods
  const renderSubcategories = () => {
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
                className=" object-contain"
                src={imgUrls[selectedImg]}
                alt="img"
              ></img>
            )}
            <img
              className="w-1/4 h-10 inline-block object-contain"
              onClick={(e) => setSelectedImg(index)}
              src={url}
              alt="img"
            ></img>
          </Fragment>
        )
      })
    )
  }

  useEffect(() => {
    // Initialize Async State
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
    <ModalContainer>
      <div className="w-full left-0 z-30">
        <InfoCard title="New Product">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="category-select">Select a category</label>
            <select
              id="category-select"
              value={category}
              onChange={handleCategorySelect}
            >
              {data && renderCategories()}
              <option value="new-category">New Category</option>
            </select>
            <input
              className="bg-gray-600 disabled:opacity-40"
              name="new cat"
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.currentTarget.value)}
              disabled={category !== 'new-category'}
              required
            ></input>
            {/* Subcategory */}
            <label htmlFor="subcategory-select">Select a category</label>
            <select
              id="subcategory-select"
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
            <input
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            ></input>
            <input
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            ></input>
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
            <input
              id="file_input"
              type="file"
              multiple
              accept=".jpg,.gif,.jpeg,.png"
              onChange={handleFileOnChange}
            ></input>
            <button type="submit">submit</button>

            {renderImagePreview()}
          </form>
        </InfoCard>
      </div>
    </ModalContainer>
  )
}

export default NewProductModal
