import { QueryResult, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { DELETE_PRODUCTS } from '../../graphql/mutation_vars'
import { ModalFormIDs } from '../../pages/modals/Modals'
import { useAppDispatch } from '../../redux/hooks'
import { toggleModal } from '../../redux/modal/modalSlice'
import customPrompt from '../../utils/customPrompt'
import SelectFilter from '../buttons/SelectFilter'
import TableCard from '../cards/TableCard'
import Checkbox from '../inputs/Checkbox'
import SelectPrimary from '../inputs/SelectPrimary'
import LoadingSpinner from '../LoadingSpinner'

const ProductsTable = ({
  products,
  className,
}: {
  products: QueryResult
  className?: string
}) => {
  const { data, loading, error, refetch, networkStatus } = products

  const [deleteProducts] = useMutation(DELETE_PRODUCTS)

  const [isChecked, setIsChecked] = useState<boolean[]>([])
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
  if (data && isChecked.length !== data.products.length) {
    setIsChecked(() => data.products.map(() => false))
  }

  const RenderTableItems = () => {
    const dispatch = useAppDispatch()

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
              <Checkbox
                type="checkbox"
                className="lg:w-4 w-5 h-5 lg:h-4 accent-purple-500 "
                value={item._id}
                checked={isChecked && isChecked[index]}
                onChange={() =>
                  setIsChecked((state) => {
                    return state?.map((val: any, idx: number) => {
                      if (index === idx) return !val
                      return val
                    })
                  })
                }
              ></Checkbox>
            </td>
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
              <div className="py-3">
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
            <td className="relative w-8 px-4 py-6  py-[1.437rem]">
              <Checkbox
                type="checkbox"
                className="lg:w-4 w-5 h-5 lg:h-4 accent-purple-500 "
              ></Checkbox>
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

  const handleSort = (string: string) => {
    setSort(string)
    if (order === -1 || string !== sort) {
      setOrder(1)
    } else {
      setOrder(-1)
    }
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
  return (
    <TableCard className={className}>
      <table className="table-auto w-full capitalize">
        <thead>
          <tr className="">
            <th className="relative w-8 px-4 py-3" colSpan={6}>
              <div className="flex">
                <SelectFilter
                  buttonText="Filter"
                  className="py-1 px-4 mr-4"
                  filter={filter}
                  setFilter={setFilter}
                ></SelectFilter>
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

          <tr
            className={`text-base dark:text-gray-400 text-gray-500 ${
              isChecked.some((val) => val === true) &&
              'bg-purple-50 dark:bg-gray-800 '
            }`}
          >
            <th className="relative w-8 px-4 py-3 ">
              <Checkbox
                type="checkbox"
                className="lg:w-4 w-5 h-5 lg:h-4 mt-1 accent-purple-500"
                checked={
                  isChecked.length > 0 && isChecked.some((val) => val === true)
                }
                onChange={() => {
                  if (isChecked.every((val) => val === true)) {
                    setIsChecked((state) => state.map((val) => false))
                  } else {
                    setIsChecked((state) => state.map((val) => true))
                  }
                }}
              ></Checkbox>
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
                  Selected {isChecked.filter((val) => val === true).length} item
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
                <th
                  onClick={() => handleSort('name')}
                  className="lg:w-5/12 px-5 hover:text-gray-700 dark:hover:text-gray-200"
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
                    className={` ml-1 mb-0.5 w-4 inline
                  ${sort !== 'name' && 'hidden'}
                  ${order === 1 ? 'rotate-0' : 'rotate-180 '}`}
                  >
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </th>
                <th
                  onClick={() => handleSort('category.name')}
                  className="w-3/12 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  Category
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={` ml-1 mb-0.5 w-4 inline
                  ${sort !== 'category.name' && 'hidden'}
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
              </>
            )}
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
                setIsChecked((val) => val.map(() => false))
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
                setIsChecked((val) => val.map(() => false))
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
                setIsChecked((val) => val.map(() => false))
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

export default ProductsTable
