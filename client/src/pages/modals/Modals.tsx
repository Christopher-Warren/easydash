import { useAppSelector } from '../../redux/hooks'

import CreateProductModal from '../../components/modals/CreateProductModal'
import { QueryResult } from '@apollo/client'
import ModifyProductModal from '../../components/modals/ModifyProductModal'
import CreateOrderModal from '../../components/modals/CreateOrderModal'

const NEWPRODUCTID = parseInt(Math.random().toFixed(16).split('.')[1])
const EDITPRODUCTID = parseInt(Math.random().toFixed(16).split('.')[1])

const NEWORDERID = parseInt(Math.random().toFixed(16).split('.')[1])

export enum ModalFormIDs {
  newProduct = NEWPRODUCTID,
  editProduct = EDITPRODUCTID,
  newOrder = NEWORDERID,
}
// TODO : Look into a better way to identify different modals
// e.g. no parseInt(Math.random().toFixed(16).split('.')[1])

type ModalDataTypes = {
  products: QueryResult
  orders: QueryResult
}

const Modals = ({ products, orders }: ModalDataTypes) => {
  const modal = useAppSelector((state) => state.modal)

  switch (modal.value) {
    case ModalFormIDs.newProduct:
      return <CreateProductModal products={products} />

    case ModalFormIDs.editProduct:
      return (
        <ModifyProductModal productId={modal.productId} products={products} />
      )

    case ModalFormIDs.newOrder:
      return <CreateOrderModal orders={orders} products={products} />

    default:
      return null
  }
}

export default Modals
