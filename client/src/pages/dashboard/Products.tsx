import { useQuery, gql } from '@apollo/client'

import PageWrapper from '../../components/PageWrapper'
import InfoCard from '../../components/InfoCard'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'

import { useAppDispatch } from '../../redux/hooks'
import { toggleModal } from '../../redux/modal/modalSlice'

import { Forms } from '../../enums/index'
import LoadingSpinner from '../../components/LoadingSpinner'
import TableCard from '../../components/TableCard'
import { useEffect, useRef, useState } from 'react'

import '../../assets/css/tables.css'

const Products = ({ userId }: any) => {
  const { data, loading, error } = useQuery(gql`
    query getCategories {
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
  `)
  const dispatch = useAppDispatch()

  const [isChecked, setIsChecked] = useState<boolean[]>([])

  const useCheck = (data: any, state: any) => {
    if (data && state.length === 0) {
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

  const renderTable = () => {
    if (!loading && !error) {
      return data.products.map((item: any, index: any) => {
        return (
          <tr
            className={` hover:bg-purple-200 ${
              isChecked[index] && 'bg-purple-50'
            }`}
            key={index}
          >
            <td className="relative w-8 px-4 py-3 ">
              <div className="border-b  border-gray-200 w-screen absolute  left-0  top-0 " />
              <input
                type="checkbox"
                className="lg:w-4 w-5 h-5 lg:h-4 accent-purple-700 "
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

            <td className=" text-gray-500 md:table-cell hidden px-3">
              <div className="border rounded-sm w-10 h-10 p-1">
                {item.images[0] ? (
                  <img
                    className=" object-cover object-center font-light rounded-sm"
                    // src={item.images[0]}
                    src="https://via.placeholder.com/150"
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
              <div className="py-2">
                <div className="">
                  <h2 className="text-base  leading-none">{item.name}</h2>
                  <span className="text-xs font text-gray-700 ">
                    {item.category.name}
                  </span>
                </div>
              </div>
            </td>
            <td className="">
              <div className=" relative">{item.subcategory.name}</div>
            </td>
            <td className="">
              <div className=" relative">{item.stock}</div>
            </td>
            <td className="text-right lg:pr-8 pr-3.5">
              <div className=" relative">$999.99</div>
            </td>
          </tr>
        )
      })
    }
  }

  return (
    <PageWrapper>
      <h1 className="text-4xl text-gray-700 font-medium ">Products</h1>
      <span className="text-gray-600 tracking-wider ">
        These are products that you currently have listed for sale
      </span>
      <div className="flex my-5">
        <PrimaryButton
          className="px-5 py-1.5 mr-5"
          id={Forms.newProduct}
          handleClick={(e: any) => {
            dispatch(toggleModal(e.target.id))
          }}
        >
          NEW PRODUCT
        </PrimaryButton>
        <SecondaryButton className="px-5 py-1.5">
          MANAGE CATEGORIES
        </SecondaryButton>
      </div>

      <TableCard>
        <table className="table-fixed w-full capitalize">
          <thead>
            <tr
              className={`text-gray-700 text-base ${
                isChecked.some((val) => val === true) && 'bg-purple-50'
              }`}
            >
              <th className="relative w-8 px-4 py-3 ">
                <input
                  type="checkbox"
                  className="lg:w-4 w-5 h-5 lg:h-4 mt-1 accent-purple-700"
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
                  <th className="lg:w-5/12 px-5"></th>
                  <th className="w-3/12"></th>
                  <th className="w-1/12"></th>
                  <th className="text-right lg:pr-8 pr-3.5"></th>
                </>
              ) : (
                <>
                  <th className="lg:w-5/12 px-5">Name</th>
                  <th className="w-3/12">Category</th>
                  <th className="w-1/12">Stock</th>
                  <th className="text-right lg:pr-8 pr-3.5">Price</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="w-full text-gray-700 text-base">
            {renderTable()}
          </tbody>
        </table>
      </TableCard>
    </PageWrapper>
  )
}

export default Products
