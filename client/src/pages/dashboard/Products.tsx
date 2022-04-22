import { useMutation, QueryResult } from '@apollo/client'

import PageWrapper from '../../components/PageWrapper'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import SecondaryButton from '../../components/buttons/SecondaryButton'

import { useAppDispatch } from '../../redux/hooks'
import { toggleModal } from '../../redux/modal/modalSlice'

import { ModalFormIDs } from '../modals/Modals'

import TableCard from '../../components/cards/TableCard'
import { useEffect, useState } from 'react'

import customPrompt from '../../utils/customPrompt'

import SelectInput from '../../components/inputs/SelectPrimary'
import LoadingSpinner from '../../components/LoadingSpinner'
import SelectFilter from '../../components/buttons/SelectFilter'
import { DELETE_PRODUCTS } from '../../graphql/mutation_vars'
import ProductsTable from '../../components/tables/ProductsTable'

const Products = ({ products }: { products: QueryResult }) => {
  const { data, loading, error, refetch, networkStatus } = products

  const [deleteProducts] = useMutation(DELETE_PRODUCTS)

  const dispatch = useAppDispatch()

  // Products State
  const [isChecked, setIsChecked] = useState<boolean[]>([])
  const [limit, setLimit] = useState(5)
  const [skip, setSkip] = useState(0)
  const [sort, setSort] = useState<null | string>(null)
  const [order, setOrder] = useState<null | number>(null)

  const [search, setSearch] = useState('')

  const [filter, setFilter] = useState([])

  // Ensure isChecked is always in sync with data
  if (data && isChecked.length !== data.products.length) {
    setIsChecked(() => data.products.map(() => false))
  }

  useEffect(() => {
    refetch({
      input: {
        limit: limit,
        skip: skip,
        sort: sort,
        order: order,
        filter: filter,
        search: search,
      },
    })
  }, [refetch, limit, skip, sort, order, filter, search])

  const handleDelete = (e: any) => {
    customPrompt(
      {
        title: 'Are you sure you wish to delete these items?',
        body: 'X items will be deleted',
        confirm: 'DELETE',
        cancel: 'BACK',
      },
      () => {
        const filterIds = data.products.filter(
          (item: any, idx: any) => isChecked[idx],
        )
        const selectedProducts = filterIds.map((item: any) => item._id)
        deleteProducts({
          variables: {
            productIds: selectedProducts,
          },
        }).then((data: any) => {
          setIsChecked((data) => data.map((i) => false))
          refetch()
        })
      },
    )
  }

  const handleSort = (string: string) => {
    setSort(string)
    if (order === -1 || string !== sort) {
      setOrder(1)
    } else {
      setOrder(-1)
    }
  }

  const RenderTableItems = () => {
    if (!loading && !error) {
      return data.products.map((item: any, index: any) => {
        return (
          <tr
            className={` hover:bg-purple-200 hover:dark:bg-gray-700 dark:odd:bg-slate-800 cursor-pointer border-y dark:border-gray-700 border-gray-200  ${
              isChecked[index] &&
              'bg-purple-50 dark:bg-gray-700/50 odd:dark:bg-gray-700/50'
            }`}
            key={index}
            onClick={(e: any) => {
              if (e.target.type === 'checkbox') return
              dispatch(
                toggleModal({
                  value: ModalFormIDs.editProduct,
                  productId: item._id,
                }),
              )
            }}
          >
            <td className="relative w-8 px-4">
              <input
                type="checkbox"
                className="lg:w-4 w-5 h-5 lg:h-4 accent-purple-500 "
                // value={item._id}
                checked={isChecked && isChecked[index]}
                onChange={() =>
                  setIsChecked((state) => {
                    return state?.map((val: any, idx: number) => {
                      if (index === idx) return !val
                      return val
                    })
                  })
                }
              ></input>
            </td>
            <td className=" md:table-cell hidden  px-3 ">
              <div className="border dark:border-gray-100/25 rounded-sm dark:text-gray-100/60 w-10 h-10 p-1 ">
                {item.images[0] ? (
                  <img
                    className="object-cover object-center font-light rounded-sm h-full w-full"
                    src={item.images[0]}
                    // src="https://via.placeholder.com/40"
                    alt={item.name + ' '}
                  ></img>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className=""
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                )}
              </div>
            </td>
            <td className="px-5 relative">
              <div className="py-2.5">
                <div className="">
                  <h2 className="text-base  leading-tight">{item.name}</h2>
                  <span className="text-xs font tracking-wider">
                    {item.subcategory.name}
                  </span>
                </div>
              </div>
            </td>
            <td className="">
              <div className=" relative">{item.category.name}</div>
            </td>
            <td className="">
              <div className=" relative">{item.stock}</div>
            </td>
            <td className="text-right lg:pr-8 pr-3.5">
              <div className="relative dark:text-green-200">{`$${item.price}`}</div>
            </td>
          </tr>
        )
      })
    } else {
      const skeleton = Array.from(Array(limit).keys())
      return skeleton.map((i) => {
        return (
          <tr
            className="hover:bg-purple-200 hover:dark:bg-gray-700 dark:odd:bg-slate-800 border-y border-gray-200 dark:border-gray-700"
            key={i}
          >
            <td className="relative w-8 px-4 py-3 ">
              {/* <div className="border-y border-gray-200 dark:border-gray-100/25 w-full absolute  left-0  top-0 " /> */}
              <input
                type="checkbox"
                className="lg:w-4 w-5 h-5 lg:h-4 accent-purple-500 "
              ></input>
            </td>
            <td className=" md:table-cell hidden  px-3 ">
              <div className="border dark:border-gray-100/25 rounded-sm dark:text-gray-100/60 w-10 h-10 p-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className=""
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
            </td>
            <td className="px-5 relative">
              <div className="py-2.5">
                <div className="">
                  <h2 className="text-base  leading-tight dark:bg-gray-700 bg-gray-200 animate-pulse rounded-full text-transparent">
                    loading
                  </h2>
                  <span className="text-xs font tracking-wider dark:bg-gray-700 bg-gray-200 animate-pulse rounded-full text-transparent">
                    loading
                  </span>
                </div>
              </div>
            </td>
            <td className="">
              <div className=" relative dark:bg-gray-700 bg-gray-200 animate-pulse rounded-full text-transparent w-1/2">
                loading
              </div>
            </td>
            <td className="">
              <div className=" relative dark:bg-gray-700 bg-gray-200 animate-pulse rounded-full text-transparent w-full">
                loading
              </div>
            </td>
            <td className="text-right lg:pr-8 pr-3.5">
              <div className="relative dark:text-green-200  !text-transparent flex justify-end">
                <span className="w-2/4 dark:bg-gray-700 bg-gray-200 animate-pulse rounded-full">
                  loading
                </span>
              </div>
            </td>
          </tr>
        )
      })
    }
  }

  return (
    <PageWrapper>
      <h1 className="text-4xl  font-medium ">Products</h1>
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
        <SecondaryButton padding="px-5 py-1.5">
          Manage Categories
        </SecondaryButton>
      </div>

      <ProductsTable products={products}></ProductsTable>
    </PageWrapper>
  )
}

export default Products
