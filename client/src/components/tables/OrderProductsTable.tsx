import { QueryResult } from '@apollo/client'
import { useEffect, useState } from 'react'

import ProductsFilter from '../filter/ProductsFilter'
import TableCard from '../cards/TableCard'
import SelectPrimary from '../inputs/SelectPrimary'
import LoadingSpinner from '../LoadingSpinner'

const OrderProductsTable = ({
  products,
  className,
  setCartItems,
}: {
  products: QueryResult
  className?: string
  setCartItems: any
}) => {
  const { data, loading, error, refetch, networkStatus } = products

  const [limit, setLimit] = useState(5)
  const [skip, setSkip] = useState(0)
  const [sort, setSort] = useState<null | string>(null)
  const [order, setOrder] = useState<null | number>(null)

  const [search, setSearch] = useState('')

  const [filter, setFilter] = useState([])
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

  const RenderTableItems = () => {
    if (!loading && !error) {
      return data.products.map((item: any, index: any) => {
        return (
          <tr
            className="hover:dark:bg-gray-700 dark:odd:bg-slate-800  border-y dark:border-gray-700 border-gray-200  dark:bg-gray-700/50 odd:dark:bg-gray-700/50"
            key={index}
          >
            <td className=" md:table-cell hidden  px-3 ">
              <div className="border dark:border-gray-100/25 rounded-sm dark:text-gray-100/60 w-10 h-10 p-1 ">
                {item.images[0] ? (
                  <img
                    className="object-cover object-center font-light rounded-sm h-full w-full"
                    src={item.images[0]}
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
              <div className=" relative">{item.stock}</div>
            </td>
            <td className="text-right lg:pr-8 pr-3.5">
              <div className="relative dark:text-green-200">{`$${item.price}`}</div>
            </td>
            <td className="text-right  lg:pr-8 pr-3.5 ">
              <div
                className="relative text-gray-600 justify-end flex"
                onClick={(e: any) => {
                  if (e.target.type === 'number') return
                  const chosenQty = parseFloat(e.currentTarget.firstChild.value)
                  setCartItems((prev: any[]) => {
                    if (!prev.some((val) => val._id === item._id)) {
                      return [...prev, { ...item, qty: chosenQty }]
                    }
                    const mappedItems = prev.map((val) => {
                      if (val._id === item._id) {
                        return {
                          ...val,
                          qty: val.qty + chosenQty,
                        }
                      }
                      return val
                    })
                    return mappedItems
                  })

                  //
                  // Doesn't work?
                  // setCartItems((prev: any[]) => {
                  //   console.log('prev', prev)
                  //   if (!prev.some((val) => val._id === item._id)) {
                  //     console.log('new item... adding')
                  //     return [...prev, { ...item, qty: 1 }]
                  //   }
                  //   const mappedItems = prev.map((val) => {
                  //     console.log(val.qty)
                  //     if (val._id === item._id) {
                  //       val.qty = val.qty + 1
                  //     }
                  //     console.log(val)
                  //     return val
                  //   })
                  //   console.log(mappedItems)
                  //   return mappedItems
                  // })
                }}
              >
                <input
                  className="w-14 mr-4 pl-1 dark:bg-gray-100 rounded-sm"
                  defaultValue={1}
                  type="number"
                ></input>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="inline dark:hover:stroke-gray-700 hover:stroke-white cursor-pointer text-green-400  hover:fill-green-400 hover:scale-[1.2]"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
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

  const handleSort = (string: string) => {
    setSort(string)
    if (order === -1 || string !== sort) {
      setOrder(1)
    } else {
      setOrder(-1)
    }
  }

  return (
    <TableCard className={className}>
      {(loading || networkStatus === 4) && <LoadingSpinner />}
      <table className="table-auto w-full capitalize">
        <thead>
          <tr className="">
            <th className="relative w-8 px-4 py-3 " colSpan={6}>
              <div className="flex">
                <ProductsFilter
                  buttonText="Filter"
                  className="py-1 px-4 mr-4"
                  filter={filter}
                  setFilter={setFilter}
                >
                  Filter
                </ProductsFilter>
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.currentTarget.value)
                  }}
                  className="rounded dark:bg-gray-900 dark:text-gray-300 px-2 py-0.5 
              w-full flex-1 
            focus:outline-purple-500 focus:accent-purple-400 border dark:border-gray-600"
                  type="search"
                  placeholder="Search products..."
                ></input>
              </div>
              <div className="border-b border-gray-200 dark:border-gray-700 w-full absolute left-0  bottom-0 " />
            </th>
          </tr>

          <tr className="text-base dark:text-gray-400 text-gray-500 px-4 ">
            <th className="w-10 md:table-cell hidden py-3">
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

            <th
              onClick={() => handleSort('name')}
              className="lg:w-5/12 px-5 hover:text-gray-700 dark:hover:text-gray-200 py-3 "
            >
              Name
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={` ml-1 mb-0.5 w-4  inline
                  ${sort !== 'name' && 'hidden'}
                  ${order === 1 ? 'rotate-0' : 'rotate-180 '}`}
              >
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </th>

            <th
              onClick={() => handleSort('stock')}
              className="w-1/12 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Qty.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={` ml-1 mb-0.5 w-4 inline
                  ${sort !== 'stock' && 'hidden'}
                  ${order === 1 ? 'rotate-0' : 'rotate-180 '}`}
              >
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </th>
            <th
              onClick={() => handleSort('price')}
              className="text-right lg:pr-8 pr-3.5 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Price
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={` ml-1 mb-0.5 w-4 inline
                  ${sort !== 'price' && 'hidden'}
                  ${order === 1 ? 'rotate-0' : 'rotate-180 '}`}
              >
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </th>
          </tr>
        </thead>
        <tbody className="text-base">
          <RenderTableItems />

          {limit > data?.products.length && (
            <tr
              className="dark:odd:bg-slate-800  border-y
       dark:border-gray-700 border-gray-200 text-gray-400 
      "
            >
              <td
                colSpan={6}
                className="relative w-8 px-4 h-14 text-center normal-case"
              >
                {data.products.length === 0 &&
                (filter.length > 0 || search.length > 0)
                  ? 'No matching products found'
                  : 'There are no more products to show'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Table Footer */}
      <div className="">
        <div className="flex items-center px-4 h-full justify-between">
          <div className="flex items-center">
            <span className="normal-case pr-2 text-gray-400">
              No. of products
            </span>
            <SelectPrimary
              className=""
              containerClassName="w-12"
              onChange={(e: any) => {
                setLimit(parseInt(e.currentTarget.value))

                setSkip(0)
              }}
            >
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </SelectPrimary>
          </div>

          <div className="flex ">
            <button
              disabled={skip === 0}
              onClick={(e: any) => {
                setSkip((prev: number) => prev - limit)
              }}
              className="p-0.5 active:outline hover:outline hover:outline-gray-500 disabled:outline-transparent dark:outline-gray-600 outline-2 rounded-sm  disabled:text-gray-300 dark:disabled:text-gray-700 dark:disabled:outline-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className=""
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button
              disabled={products.data?.products?.length < limit}
              onClick={(e: any) => {
                setSkip((prev: number) => prev + limit)
              }}
              className="ml-4 p-0.5 active:outline hover:outline hover:outline-gray-500 disabled:outline-transparent dark:outline-gray-600 outline-2 rounded-sm  disabled:text-gray-300 dark:disabled:text-gray-700 dark:disabled:outline-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className=""
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </TableCard>
  )
}

export default OrderProductsTable
