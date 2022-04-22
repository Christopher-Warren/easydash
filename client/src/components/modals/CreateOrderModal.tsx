import { QueryResult } from '@apollo/client'
import { useState } from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'

import InfoCardSmall from '../cards/InfoCardSmall'
import OrderProductsTable from '../tables/OrderProductsTable'
import ProductsTable from '../tables/ProductsTable'
import ModalContainer, { PromptTypes } from './ModalContainer'

const CreateOrderModal = ({
  products,
  orders,
}: {
  products: QueryResult
  orders: QueryResult
}) => {
  const closePromptOpts: PromptTypes = {
    title: 'Are you sure you wish to go back?',
    body: 'All changes will be lost',
    confirm: 'Back',
    cancel: 'Stay',
  }

  const [cartItems, setCartItems] = useState([])

  return (
    <ModalContainer
      size="max-w-7xl"
      title="Create Order"
      opts={closePromptOpts}
    >
      <div className="flex flex-col lg:flex-row gap-6 ">
        <OrderProductsTable
          className="lg:w-2/3 w-full shadow-md "
          products={products}
          setCartItems={setCartItems}
        ></OrderProductsTable>
        <InfoCardSmall title="Cart" className="lg:w-1/3 h-full">
          <div className="flex flex-col h-64 overflow-y-auto border">
            {cartItems.map((item: any) => (
              <div className="">
                {item.name + '  x   ' + item.qty}
                {/* {item.name} */}
              </div>
            ))}
          </div>
          <div>Subtotal: </div>

          <div>Total: </div>
        </InfoCardSmall>
      </div>
      <div className="w-full flex flex-row-reverse justify-between mt-6">
        <PrimaryButton className="px-3 py-1">Create Order</PrimaryButton>
        <SecondaryButton className="px-3 py-1">Back</SecondaryButton>
      </div>
    </ModalContainer>
  )
}

export default CreateOrderModal
