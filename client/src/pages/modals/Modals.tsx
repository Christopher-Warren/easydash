import { useAppSelector } from '../../redux/hooks'

import NewProductModal from '../../components/modals/NewProductModal'
import { QueryResult } from '@apollo/client'
import ModifyProductModal from '../../components/modals/ModifyProductModal'
import React from 'react'

const NEWPRODUCTID = parseInt(Math.random().toFixed(16).split('.')[1])
const EDITPRODUCTID = parseInt(Math.random().toFixed(16).split('.')[1])

const NEWORDERID = parseInt(Math.random().toFixed(16).split('.')[1])

export enum ModalFormIDs {
  newProduct = NEWPRODUCTID,
  editProduct = EDITPRODUCTID,
  newOrder = NEWORDERID,
}

const Modals = ({ products }: { products: QueryResult }) => {
  const modal = useAppSelector((state) => state.modal)

  switch (modal.value) {
    case ModalFormIDs.newProduct:
      return <NewProductModal products={products} />

    case ModalFormIDs.editProduct:
      return (
        <ModifyProductModal productId={modal.productId} products={products} />
      )

    case ModalFormIDs.newOrder:
      return <div>newOrder form</div>

    default:
      return null
  }
}

export default Modals
