import { useAppSelector } from '../../redux/hooks'

import CreateProductModal from '../../components/modals/CreateProductModal'
import { useQuery } from '@apollo/client'
import ModifyProductModal from '../../components/modals/ModifyProductModal'
import CreateOrderModal from '../../components/modals/CreateOrderModal'
import { GET_ALL_ORDERS, GET_PRODUCTS } from '../../graphql/query_vars'

const NEWPRODUCTID = parseInt(Math.random().toFixed(16).split('.')[1])
const EDITPRODUCTID = parseInt(Math.random().toFixed(16).split('.')[1])

const NEWORDERID = parseInt(Math.random().toFixed(16).split('.')[1])

export enum ModalFormIDs {
  newProduct = NEWPRODUCTID,
  editProduct = EDITPRODUCTID,
  newOrder = NEWORDERID,
}

const Modals = () => {
  const modal = useAppSelector((state) => state.modal)

  const products = useQuery(GET_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
  })

  const orders = useQuery(GET_ALL_ORDERS, {
    notifyOnNetworkStatusChange: true,
  })

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
