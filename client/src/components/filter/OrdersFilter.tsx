import { useQuery } from '@apollo/client'
import { useState } from 'react'
import SelectOption from '../buttons/SelectOption'

// Handle errors
import { addError } from '../../redux/error/errorSlice'
import { useAppDispatch } from '../../redux/hooks'
import {
  GET_ALL_CATEGORIES,
  GET_ALL_SUBCATEGORIES,
} from '../../graphql/query_vars'
import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import Checkbox from '../inputs/Checkbox'
import TotalFilter from './filter_items/TotalFilter'
import StatusFilter from './filter_items/StatusFilter'
import OrderNumberFilter from './filter_items/OrderNumberFilter'

const OrdersFilter = ({
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

  const [total, setTotal] = useState({ min: 0, max: 0 })
  const [orderNumber, setOrderNumber] = useState({ min: 0, max: 0 })

  const [statusChecked, setStatusChecked] = useState({
    paid: false,
    fulfilled: false,
  })

  // handle errors
  const dispatch = useAppDispatch()

  const handleFormSubmit = (e: any) => {
    e.preventDefault()

    const categoryFilter: {}[] = []
    const subcategoryFilter: {}[] = []

    if (total.min > total.max) {
      dispatch(addError('Min price should be less than max price'))
      return
    }

    if (orderNumber.min > orderNumber.max) {
      dispatch(addError('Min price should be less than max price'))
      return
    }

    for (let i = 0; i < e.currentTarget.length; i++) {
      const isChecked = e.currentTarget[i].checked
      const eleName = e.currentTarget[i].name

      if (eleName === 'status option' && isChecked) {
        categoryFilter.push(e.currentTarget[i].value)
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

      if (total.min && total.max > 0) {
        newFilter.push({
          field: 'total',
          query: {
            gte: total.min,
            lte: total.max,
          },
        })
      }

      if (orderNumber.min && orderNumber.max > 0) {
        newFilter.push({
          field: 'orderNumber',
          query: {
            gte: orderNumber.min,
            lte: orderNumber.max,
          },
        })
      }

      return newFilter
    })
  }

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
        className={`absolute rounded-sm overflow-hidden drop-shadow-[0_5px_8px_rgb(0,0,0,0.1)] dark:shadow-gray-900/50 
      dark:bg-gray-800 dark:text-white  transition-all 
    text-black z-40  bg-white
      ${hide && 'h-0 w-0 opacity-0'} `}
      >
        <div className="flex flex-wrap  w-max text-gray-800 dark:text-gray-50">
          <form id="filter form" onSubmit={handleFormSubmit}>
            <div className="flex justify-between items-center border-b dark:border-gray-600 border-gray-300 py-5 px-5 ">
              <span className="text-xl text-center ">Filter</span>
              <div className="ml-24">
                <SecondaryButton
                  className="px-3 py-1"
                  onClick={(e: any) => {
                    e.preventDefault()

                    setFilter([])
                    setTotal({ min: 0, max: 0 })
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
            <SelectOption filter={filter} name="order number">
              <OrderNumberFilter
                orderNumber={orderNumber}
                setOrderNumber={setOrderNumber}
              ></OrderNumberFilter>
            </SelectOption>

            <SelectOption name="status">
              <StatusFilter
                statusChecked={statusChecked}
                setStatusChecked={setStatusChecked}
              />
            </SelectOption>

            <SelectOption filter={filter} name="total">
              <TotalFilter total={total} setTotal={setTotal}></TotalFilter>
            </SelectOption>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OrdersFilter
