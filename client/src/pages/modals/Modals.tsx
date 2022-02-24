import { useAppSelector } from '../../redux/hooks'

import NewProductModal from '../../components/modals/NewProductModal'
import { QueryResult } from '@apollo/client'

const NEWPRODUCTID = parseInt(Math.random().toFixed(16).split('.')[1])
const EDITPRODUCTID = parseInt(Math.random().toFixed(16).split('.')[1])

export enum ModalFormIDs {
  newProduct = NEWPRODUCTID,
  editProduct = EDITPRODUCTID,
}

const Modals = ({ products }: { products: QueryResult }) => {
  const modal = useAppSelector((state) => state.modal)

  switch (modal.value) {
    case ModalFormIDs.newProduct:
      return <NewProductModal products={products} />

    case ModalFormIDs.editProduct:
      return <NewProductModal productId={modal.productId} products={products} />

    default:
      return null
  }
}

export default Modals
