import { useQuery } from '@apollo/client'
import { useState } from 'react'
import SelectOption from './SelectOption'

// Handle errors
import { toggleModal } from '../../redux/modal/modalSlice'
import { addError } from '../../redux/error/errorSlice'
import { useAppDispatch } from '../../redux/hooks'
import {
  GET_ALL_CATEGORIES,
  GET_ALL_SUBCATEGORIES,
} from '../../graphql/query_vars'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

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
  const [hide, setHide] = useState(false)

  const { data } = useQuery(GET_ALL_CATEGORIES)

  const { data: subcategories } = useQuery(GET_ALL_SUBCATEGORIES)

  // State for options

  const [categoriesState, setCategoriesState] = useState<any>([])
  const [subcategoriesState, setSubcategoriesState] = useState<any>([])

  const [price, setPrice] = useState({ min: 0, max: 0 })
  const [stock, setStock] = useState({ min: 0, max: 0, showOut: false })

  // handle errors
  const dispatch = useAppDispatch()

  const handleFormSubmit = (e: any) => {
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
    console.log(categoryFilter)
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
  }

  return (
    <div
      // onBlur={(e: any) => {
      //   if (!e.currentTarget.contains(e.relatedTarget)) {
      //     setHide(true)
      //   }
      // }}
      className="relative"
    >
      <button
        onClick={(e) => setHide(!hide)}
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
        className={`absolute rounded-sm overflow-hidden shadow-lg shadow-gray-900/50 
      dark:bg-gray-800 dark:text-white  transition-all
    text-black z-40  bg-white
      ${hide && 'h-0 w-0 opacity-0'} `}
      >
        <div className="flex flex-wrap  w-max">
          <form id="filter form" onSubmit={handleFormSubmit}>
            <div className="flex justify-between items-center border-b border-gray-600 py-5 px-5 ">
              <span className="text-xl text-center ">Filter</span>
              <div className="ml-24">
                <SecondaryButton
                  className="px-3 py-1"
                  onClick={(e: any) => {
                    e.preventDefault()

                    setSubcategoriesState([])
                    setCategoriesState([])
                    setFilter([])
                    setPrice({ min: 0, max: 0 })
                    setStock({ min: 0, max: 0, showOut: false })
                    setHide(true)
                  }}
                >
                  Clear
                </SecondaryButton>
                <PrimaryButton type="submit" className="px-3 py-1 ml-3">
                  Apply
                </PrimaryButton>
              </div>
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
