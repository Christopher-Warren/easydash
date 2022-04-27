import { useState } from 'react'
import SelectOption from '../buttons/SelectOption'

// Handle errors
import { addError } from '../../redux/error/errorSlice'
import { useAppDispatch } from '../../redux/hooks'

import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
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
  const [hide, setHide] = useState(false)

  const [total, setTotal] = useState({ min: 0, max: 0 })
  const [orderNumber, setOrderNumber] = useState({ min: 0, max: 0 })

  const [paymentActive, setPaymentActive] = useState(false)
  const [fulfillmentActive, setFulfillmentActive] = useState(false)
  const [statusChecked, setStatusChecked] = useState({
    paid: false,
    fulfilled: false,
  })
  // handle errors
  const dispatch = useAppDispatch()

  const handleFormSubmit = (e: any) => {
    e.preventDefault()

    if (total.min > total.max) {
      dispatch(addError('Minimum should be less than maximum'))
      return
    }

    if (orderNumber.min > orderNumber.max) {
      dispatch(addError('Minimum should be less than maximum'))
      return
    }

    setFilter(() => {
      const newFilter: any = []

      if (paymentActive) {
        newFilter.push({
          field: 'status.paid',
          query: {
            boolean: statusChecked.paid,
          },
        })
      }

      if (fulfillmentActive) {
        newFilter.push({
          field: 'status.fulfilled',
          query: {
            boolean: statusChecked.fulfilled,
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

    setHide(true)
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

                    setFulfillmentActive(false)
                    setPaymentActive(false)
                    setOrderNumber({ min: 0, max: 0 })
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
                paymentActive={paymentActive}
                setPaymentActive={setPaymentActive}
                fulfillmentActive={fulfillmentActive}
                setFulfillmentActive={setFulfillmentActive}
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
