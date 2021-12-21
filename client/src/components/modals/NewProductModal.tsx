import InfoCard from '../InfoCard'
import ModalContainer from './ModalContainer'

import { useQuery, gql, useLazyQuery } from '@apollo/client'
import FormInput from '../FormInput'
import { useEffect, useState } from 'react'

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
  const [newCategoryInput, setNewCategoryInput] = useState<any>(undefined)
  const [newSubCategoryInput, setNewSubCategoryInput] = useState<any>(undefined)
  // State for Form Data

  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(null)
  const [stock, setStock] = useState(0)

  return (
    <ModalContainer>
      <div className="w-full left-0 z-30">
        <InfoCard title="New Product">
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <label htmlFor="category-select">Select a category</label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => {
                const selectedIndex = e.target.options.selectedIndex

                if (selectedIndex < data.categories.length) {
                  setSelectedCategory(selectedIndex)
                  setNewCategoryInput(undefined)
                } else {
                  setNewSubCategoryInput('')
                  setNewCategoryInput('')
                }
                setCategory(e.currentTarget.value)
              }}
            >
              {data &&
                data.categories.map((category: any, index: number) => {
                  return (
                    <>
                      <option key={index} onClick={(e) => {}}>
                        {category.name}
                      </option>
                      {/* Subcategory does not follow this same pattern
                          where the new-category option is rendered outside of the map statement */}
                      {index === data.categories.length - 1 && (
                        <option
                          value="new-category"
                          onClick={(e) => {
                            // setCategory(e.currentTarget.value)
                            // setNewCategoryInput('')
                            // setNewSubCategoryInput('')
                          }}
                        >
                          New Category
                        </option>
                      )}
                    </>
                  )
                })}
            </select>
            <input
              className="bg-gray-600 disabled:opacity-40"
              name="new cat"
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.currentTarget.value)}
              disabled={newCategoryInput === undefined}
            ></input>

            {/* Subcategory */}

            <label htmlFor="subcategory-select">Select a category</label>
            <select id="subcategory-select" value={subcategory}>
              {data &&
                data.categories[selectedCategory].subcategories.map(
                  (subcategory: any, index: number) => {
                    return (
                      <>
                        <option
                          key={index}
                          onClick={() => {
                            setNewSubCategoryInput(undefined)
                            setSubcategory(subcategory.name)
                          }}
                        >
                          {subcategory.name}
                        </option>
                      </>
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
              disabled={newSubCategoryInput === undefined}
            ></input>

            <input placeholder="name"></input>
            <input placeholder="description"></input>
            <input placeholder="price"></input>

            <input placeholder="stock"></input>
            <button type="submit">submit</button>
          </form>
        </InfoCard>
      </div>
    </ModalContainer>
  )
}

export default NewProductModal
