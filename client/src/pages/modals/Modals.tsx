import { useAppSelector } from '../../redux/hooks'

import NewProductModal from '../../components/modals/NewProductModal'
import { QueryResult } from '@apollo/client'

const NEWPRODUCTID = parseInt(Math.random().toFixed(16).split('.')[1])

export enum ModalFormIDs {
  newProduct = NEWPRODUCTID,
}

const Modals = ({ products }: { products: QueryResult }) => {
  const modal = useAppSelector((state) => state.modal.value)

  switch (modal) {
    case ModalFormIDs.newProduct:
      return <NewProductModal products={products} />

    default:
      return null
  }
}

export default Modals
