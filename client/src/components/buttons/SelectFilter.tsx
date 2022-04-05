import { gql, useQuery } from '@apollo/client'
import { useEffect, useRef, useState } from 'react'
import SelectOption from './SelectOption'

// Handle errors
import { toggleModal } from '../../redux/modal/modalSlice'
import { addError } from '../../redux/error/errorSlice'
import { useAppDispatch } from '../../redux/hooks'

const SelectFilter = ({
  options,
  buttonText,
  children,
  padding,
  id,
  className,
  type,
  filter,
  setFilter,
}: any) => {
  const [hide, setHide] = useState(true)

  const { data } = useQuery(gql`
    query getAllCategories {
      getAllCategories {
        name
        _id
        subcategories {
          name
          _id
        }
      }
    }
  `)

  const { data: subcategories } = useQuery(gql`
    query getAllSubcategories {
      getAllSubcategories {
        name
        _id
      }
    }
  `)

  // State for options

  const [categoriesState, setCategoriesState] = useState<any>([])
  const [subcategoriesState, setSubcategoriesState] = useState<any>([])

  const [price, setPrice] = useState({ min: 0, max: 0 })
  const [stock, setStock] = useState({ min: 0, max: 0, showOut: false })

  // handle errors
  const dispatch = useAppDispatch()

  return (
    <div
      onBlur={(e: any) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setHide(true)
        }
      }}
      className="relative"
    >
      <button
        onClick={(e) => setHide(false)}
        id={id}
        type={type}
        className={`flex  justify-around font-medium text-md tracking-wide leading-relaxed rounded
        ${padding}
        ${className}
      bg-purple-600 text-white
      hover:bg-purple-700 hover:shadow-md 
        focus:shadow-md focus:outline-purple-500 focus:accent-purple-400
      shadow-purple-500/50 shadow
      transition-color duration-200
      `}
      >
        {buttonText} {filter.length > 0 && filter.length}
      </button>

      <div
        tabIndex={0}
        className={`absolute rounded-sm overflow-hidden dark:shadow-md dark:shadow-gray-900
      dark:bg-gray-600 dark:text-white shadow
    text-black z-40  bg-white
      ${hide && 'h-0 w-0 opacity-0'} `}
      >
        <div className="flex flex-wrap w-min px-3 py-2">
          <h1 className="text-xl text-center text-gray-400 w-full ">Filter</h1>
          <form
            id="filter form"
            onSubmit={(e: any) => {
              e.preventDefault()

              const categoryFilter: {}[] = []
              const subcategoryFilter: {}[] = []

              const priceFilter: any[] = []
              const stockFilter: {}[] = []

              if (price.min > price.max) {
                dispatch(addError('Min price should be less than max price'))
                return
              }
              if (stock.min > stock.max) {
                dispatch(addError('Min price should be less than max price'))
                return
              }

              for (let i = 0; i < e.currentTarget.length; i++) {
                const isChecked = e.currentTarget[i].checked
                const eleName = e.currentTarget[i].name

                if (eleName === 'category option' && isChecked) {
                  categoryFilter.push(e.currentTarget[i].value)
                }
                if (eleName === 'subcategory option' && isChecked) {
                  subcategoryFilter.push(e.currentTarget[i].value)
                }
              }

              setFilter(() => {
                const newFilter: any = []

                if (categoryFilter.length > 0) {
                  newFilter.push({
                    field: 'category.name',
                    query: {
                      in: categoryFilter,
                    },
                  })
                }

                if (subcategoryFilter.length > 0) {
                  newFilter.push({
                    field: 'subcategory.name',
                    query: {
                      in: subcategoryFilter,
                    },
                  })
                }

                if (price.min && price.max > 0) {
                  newFilter.push({
                    field: 'price',
                    query: {
                      gte: price.min,
                      lte: price.max,
                    },
                  })
                }

                if ((stock.min > 0 && stock.max) || stock.max) {
                  newFilter.push({
                    field: 'stock',
                    query: {
                      gte: stock.min,
                      lte: stock.max,
                    },
                  })
                }

                return newFilter
              })
            }}
          >
            <div className="flex justify-between">
              <button type="submit" className="order-2">
                Apply
              </button>
              <button
                className="order-1"
                onClick={(e) => {
                  e.preventDefault()

                  setSubcategoriesState([])
                  setCategoriesState([])
                  setFilter([])
                  setPrice({ min: 0, max: 0 })
                  setStock({ min: 0, max: 0, showOut: false })
                }}
              >
                Clear
              </button>
            </div>

            <SelectOption
              filter={filter}
              categories={data}
              categoriesState={categoriesState}
              setCategoriesState={setCategoriesState}
              name="category"
            ></SelectOption>
            <SelectOption
              filter={filter}
              data={data}
              name="subcategory"
              subcategories={subcategories}
              subcategoriesState={subcategoriesState}
              setSubcategoriesState={setSubcategoriesState}
            ></SelectOption>

            <SelectOption
              filter={filter}
              data={data}
              price={price}
              setPrice={setPrice}
              name="price"
            ></SelectOption>
            <SelectOption
              filter={filter}
              data={data}
              stock={stock}
              setStock={setStock}
              name="qty."
            ></SelectOption>
          </form>
        </div>

        {/* {renderCategories()} */}
      </div>
    </div>
  )
}

export default SelectFilter
