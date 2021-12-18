import InfoCard from '../InfoCard'
import ModalContainer from './ModalContainer'

import { useQuery, gql, useLazyQuery } from '@apollo/client'
import FormInput from '../FormInput'
import { useState } from 'react'

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

  const [newCategory, setNewCategory] = useState('')
  const [newCategoryDisabled, setNewCategoryDisabled] = useState(true)

  // set new category input to disabled when selectedCategory === data.length
  // may not need to use setcategory disabled state

  console.log(data.categories.length)

  return (
    <ModalContainer>
      <div className="w-full left-0 z-30">
        <InfoCard title="New Product">
          {/* category */}
          <label htmlFor="category-select">Select a category</label>
          <select
            id="category-select"
            onChange={(e) => {
              if (e.currentTarget.value !== 'new-category') {
                setNewCategory('')
                setNewCategoryDisabled(true)
              } else {
                setNewCategoryDisabled(false)
              }
            }}
          >
            {/* <option value="select-category">Select a Category</option> */}
            {data &&
              data.categories.map((i: any, index: number) => {
                return (
                  <option
                    value={i.name}
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                  >
                    {i.name}
                  </option>
                )
              })}
            <option value="new-category">New Category</option>
          </select>
          <input
            className="bg-gray-600 disabled:opacity-40"
            name="new cat"
            value={newCategory}
            onChange={(e) => setNewCategory(e.currentTarget.value)}
            disabled={newCategoryDisabled}
          ></input>

          {/* Subcategory */}

          <label htmlFor="category-select">Select a category</label>
          <select id="category-select" onChange={(e) => {}}>
            {data &&
              data.categories[selectedCategory].subcategories.map(
                (i: any, index: number) => {
                  return (
                    <option value={i.name} key={index}>
                      {i.name}
                    </option>
                  )
                },
              )}
            {/* <option value="new-category">New Category</option> */}
          </select>

          <input placeholder="name"></input>
          <input placeholder="description"></input>
          <input placeholder="price"></input>

          <input placeholder="stock"></input>
        </InfoCard>
      </div>
    </ModalContainer>
  )
}

export default NewProductModal
