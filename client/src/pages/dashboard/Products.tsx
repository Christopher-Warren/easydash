import {
  useQuery,
  gql,
  useMutation,
  NetworkStatus,
  QueryResult,
} from '@apollo/client'

import PageWrapper from '../../components/PageWrapper'
import InfoCard from '../../components/cards/InfoCard'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import SecondaryButton from '../../components/buttons/SecondaryButton'

import { useAppDispatch } from '../../redux/hooks'
import { toggleModal } from '../../redux/modal/modalSlice'

import { ModalFormIDs } from '../modals/Modals'
import LoadingSpinner from '../../components/LoadingSpinner'
import TableCard from '../../components/cards/TableCard'
import React, { ReactPropTypes, useEffect, useRef, useState } from 'react'

import '../../assets/css/tables.css'
import customPrompt from '../../utils/customPrompt'
import { addError } from '../../redux/error/errorSlice'

const Products = ({ products }: { products: QueryResult }) => {
  console.log(products)
  const { data, loading, error, refetch } = useQuery(
    gql`
      query getProducts {
        products {
          name
          images
          category {
            name
          }
          subcategory {
            name
          }
          price
          stock
          _id
        }
      }
    `,
  )

  const [deleteProducts] = useMutation(gql`
    mutation deleteProducts($productIds: [ID]!) {
      deleteProducts(productIds: $productIds)
    }
  `)

  const dispatch = useAppDispatch()

  const [isChecked, setIsChecked] = useState<boolean[]>([])

  const useCheck = (data: any, state: any) => {
    if (data && data.products.length > 0 && state.length === 0) {
      // can set initial state
      return true
    } else {
      // not set state
      return false
    }
  }
  const isloaded = useCheck(data, isChecked)

  if (isloaded) {
    // Initialize async state
    setIsChecked(data.products.map(() => false))
  }

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
        console.log(selectedProducts)
        deleteProducts({
          variables: {
            productIds: selectedProducts,
          },
        }).then((data: any) => {
          refetch().then(({ data }: any) => {
            setIsChecked(data.products.map(() => false))
          })
        })
      },
    )
  }

  const renderTableItems = () => {
    if (!loading && !error) {
      return data.products.map((item: any, index: any) => {
        return (
          <tr
            className={` hover:bg-purple-200 hover:dark:bg-gray-700 dark:odd:bg-slate-800 ${
              isChecked[index] &&
              'bg-purple-50 dark:bg-gray-700/50 odd:dark:bg-gray-700/50'
            }`}
            key={index}
          >
            <td className="relative w-8 px-4 py-3 ">
              <div className="border-b border-gray-200 dark:border-gray-100/25 w-screen absolute  left-0  top-0 " />
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

            <td className=" md:table-cell hidden px-3">
              <div className="border dark:border-gray-100/25 rounded-sm dark:text-gray-100/60 w-10 h-10 p-1 ">
                {item.images[0] ? (
                  <img
                    className="object-cover object-center font-light rounded-sm"
                    // src={item.images[0]}
                    src="https://via.placeholder.com/40"
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
    }
  }

  return (
    <PageWrapper>
      <h1 className="text-4xl  font-medium ">Products</h1>
      <span className=" tracking-wider dark:text-gray-100">
        These are products that you currently have listed for sale
      </span>

      <div className="flex my-5">
        <PrimaryButton
          padding="px-5 py-1.5 mr-5"
          id={ModalFormIDs.newProduct}
          handleClick={(e: any) => {
            dispatch(toggleModal(e.target.id))
          }}
        >
          NEW PRODUCT
        </PrimaryButton>
        <SecondaryButton padding="px-5 py-1.5">
          MANAGE CATEGORIES
        </SecondaryButton>
      </div>

      <TableCard>
        <table className="table-fixed w-full capitalize">
          <thead>
            <tr
              className={`text-base dark:text-gray-400 text-gray-500 ${
                isChecked.some((val) => val === true) &&
                'bg-purple-50 dark:bg-gray-700 last-of-type:'
              }`}
            >
              <th className="relative w-8 px-4 py-3 ">
                <input
                  type="checkbox"
                  className="lg:w-4 w-5 h-5 lg:h-4 mt-1 accent-purple-500"
                  checked={
                    isChecked.length > 0 &&
                    isChecked.some((val) => val === true)
                  }
                  onChange={() => {
                    if (isChecked.every((val) => val === true)) {
                      setIsChecked((state) => state.map((val) => false))
                    } else {
                      setIsChecked((state) => state.map((val) => true))
                    }
                  }}
                ></input>
              </th>

              <th className="w-10 md:table-cell hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 opacity-0"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </th>
              {isChecked.some((val) => val === true) ? (
                <>
                  <th className="lg:w-5/12 px-5">
                    Selected {isChecked.filter((val) => val === true).length}{' '}
                    item
                    {isChecked.filter((val) => val === true).length > 1 && 's'}
                  </th>
                  <th className="w-3/12"></th>
                  <th className="w-1/12"></th>
                  <th className="text-right lg:pr-8 pr-3.5">
                    <button
                      className=" p-1 rounded-full bg-red-400 text-white hover:bg-red-500 transition-colors"
                      onClick={handleDelete}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline w-6 h-6 scale-90"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </th>
                </>
              ) : (
                <>
                  <th className="lg:w-5/12 px-5">Name</th>
                  <th className="w-3/12">Category</th>
                  <th className="w-1/12">Qty.</th>
                  <th className="text-right lg:pr-8 pr-3.5">Price</th>
                </>
              )}
            </tr>
          </thead>

          <tbody className="w-full  text-base">{renderTableItems()}</tbody>
        </table>
      </TableCard>
    </PageWrapper>
  )
}

export default Products
