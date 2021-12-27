import InfoCard from '../InfoCard'
import ModalContainer from './ModalContainer'

import { useQuery, gql, useLazyQuery } from '@apollo/client'
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

  // Initialize Async State
  useEffect(() => {
    if (data && pageLoads.current < 1) {
      pageLoads.current++
      setCategory(data.categories[0].name)
      setSubcategory(data.categories[0].subcategories[0].name)
    }
  }, [data])

  const formData = new FormData()

  return (
    <ModalContainer>
      <div className="w-full left-0 z-30">
        <InfoCard title="New Product">
          <form
            onSubmit={(e: any) => {
              e.preventDefault()

              axios
                .post('/api/image', formData, {
                  headers: {
                    productid: '61806fd6ae0e565cbafa9418',
                  },
                })
                .then((data) => {
                  console.log(data)
                })
                .catch((err) => console.log(err))

              console.log('data', formData.get('file'))
            }}
          >
            <label htmlFor="category-select">Select a category</label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => {
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
                if (data.categories[selectedIndex]?.subcategories.length === 0)
                  setSubcategory('new-subcategory')
                setCategory(e.currentTarget.value)
              }}
            >
              {data &&
                data.categories.map((category: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      <option>{category.name}</option>
                      {/* Subcategory does not follow this same pattern
                          where the new-category option is rendered outside of the map statement */}
                      {index === data.categories.length - 1 && (
                        <option value="new-category">New Category</option>
                      )}
                    </Fragment>
                  )
                })}
            </select>
            <input
              className="bg-gray-600 disabled:opacity-40"
              name="new cat"
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.currentTarget.value)}
              disabled={category !== 'new-category'}
            ></input>

            {/* Subcategory */}

            <label htmlFor="subcategory-select">Select a category</label>
            <select
              id="subcategory-select"
              value={subcategory}
              onChange={(e) => {
                const selectedIndex = e.currentTarget.options.selectedIndex

                if (selectedIndex < data.categories.length) {
                  setNewCategoryInput('')
                }
                setSubcategory(e.currentTarget.value)
              }}
            >
              {data &&
                data.categories[selectedCategory]?.subcategories.map(
                  (subcategory: any, index: number) => {
                    return (
                      <Fragment key={index}>
                        <option>{subcategory.name}</option>
                      </Fragment>
                    )
                  },
                )}
              {data && (
                <option
                  value="new-subcategory"
                  onClick={(e) => setSubcategory(e.currentTarget.value)}
                >
                  New Category
                </option>
              )}
            </select>

            <input
              className="bg-gray-600 disabled:opacity-40"
              name="new cat"
              value={newSubCategoryInput}
              onChange={(e) => setNewSubCategoryInput(e.currentTarget.value)}
              disabled={subcategory !== 'new-subcategory'}
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
              type="file"
              multiple
              accept=".jpg,.gif,.jpeg,.png"
              onChange={(e: any) => {
                formData.delete('photos')
                formData.append('photos', e.currentTarget.files[0])
              }}
            ></input>
            <button type="submit">submit</button>
          </form>
        </InfoCard>
      </div>
    </ModalContainer>
  )
}

export default NewProductModal
