import { QueryResult } from '@apollo/client'

import PageWrapper from '../../components/PageWrapper'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import SecondaryButton from '../../components/buttons/SecondaryButton'

import { useAppDispatch } from '../../redux/hooks'
import { toggleModal } from '../../redux/modal/modalSlice'

import { ModalFormIDs } from '../modals/Modals'

import LoadingSpinner from '../../components/LoadingSpinner'

import ProductsTable from '../../components/tables/ProductsTable'

const Products = ({ products }: { products: QueryResult }) => {
  const { data, loading, error, refetch, networkStatus } = products

  const dispatch = useAppDispatch()

  return (
    <PageWrapper>
      <h1 className="text-4xl font-medium">Products</h1>
      <span className=" tracking-wider dark:text-gray-100">
        These are products that you currently have listed for sale
      </span>
      {(loading || networkStatus === 4) && <LoadingSpinner />}

      <div className="flex my-5">
        <PrimaryButton
          padding="px-5 py-1.5 mr-5"
          onClick={(e: any) => {
            e.preventDefault()

            dispatch(toggleModal({ value: ModalFormIDs.newProduct }))
          }}
        >
          New Product
        </PrimaryButton>
        {/* <SecondaryButton padding="px-5 py-1.5">
          Manage Categories
        </SecondaryButton> */}
      </div>

      <ProductsTable products={products}></ProductsTable>
    </PageWrapper>
  )
}

export default Products
