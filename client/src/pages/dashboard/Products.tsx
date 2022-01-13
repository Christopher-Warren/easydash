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
      }
    }
  `)
  const dispatch = useAppDispatch()

  const [isChecked, setIsChecked] = useState<undefined | any[]>(undefined)

  const useCheck = (data: any, state: any) => {
    if (data && !state) {
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
    if (loading) {
      let skeleton = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

      return skeleton.map((item: any, index: any) => {
        return (
          <tr
            className="relative pointer-events-none animate-pulse"
            key={index}
          >
            <td className="px-6 py-5 w-0">
              <input type="checkbox" className="w-4 h-4"></input>
            </td>

            <td className="w-0 pr-2 text-gray-500">
              <div className="border p-1 rounded-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
            </td>

            <td className=" ">
              <div className="border-t border-gray-200 w-screen  absolute left-0 top-0 " />
              <div className="relative py-2">
                <div className="">
                  <div className="textLg  leading-none bg-gray-300 roundedLg w-64 h-4 mb-2"></div>
                  <div className="bg-gray-300 roundedLg w-1/4 h-4"></div>
                </div>
              </div>
            </td>
            <td>
              <div className=" relative bg-gray-300 roundedLg w-1/4 h-4"></div>
            </td>
            <td>
              <div className=" relative bg-gray-300 roundedLg w-1/4 h-4"></div>
            </td>
            <td className="text-right pr-5">
              <div className=" relative bg-gray-300 roundedLg h-4"></div>
            </td>
          </tr>
        )
      })
    } else if (!loading && !error) {
      return data.products.map((item: any, index: any) => {
        return (
          <tr className="relative hover:bg-purple-200" key={index}>
            <td className="px-6 py-5 w-0">
              <input
                type="checkbox"
                className="w-4 h-4"
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

            <td className="w-0 pr-2 text-gray-500">
              <div className="border p-1 rounded-sm">
                {item.images[0] ? (
                  <img
                    className="w-8 h-8 object-cover object-center fontLight rounded-sm"
                    src={item.images[0]}
                    alt={item.name + ' '}
                  ></img>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className=" w-8  "
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

            <td>
              <div className="border-t border-gray-200 w-screen  absolute left-0 top-0 " />
              <div className="relative py-2">
                <div className="w-64">
                  <h2 className="textLg  leading-none">{item.name}</h2>
                  <span className="text-sm font text-gray-700 ">
                    {item.category.name}
                  </span>
                </div>
              </div>
            </td>
            <td>
              <div className=" relative">{item.subcategory.name}</div>
            </td>
            <td>
              <div className=" relative">{item.stock}</div>
            </td>
            <td className="text-right pr-5">
              <div className=" relative">{item.price}</div>
            </td>
          </tr>
        )
      })
    }
  }

  return (
    <PageWrapper>
      <h1 className="text-4xl text-gray-700 font-medium ">Products</h1>
      <span className="text-gray-600 trackingWider ">
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
        <table className="w-full ">
          <thead>
            <tr className="text-gray-800 text-xl">
              <td className="px-6 py-3 w-0">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  onChange={() =>
                    setIsChecked((state) => state?.map((val) => !val))
                  }
                ></input>
              </td>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th className="pr-5 w-0">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 ">{renderTable()}</tbody>
        </table>
      </TableCard>
    </PageWrapper>
  )
}

export default Products
