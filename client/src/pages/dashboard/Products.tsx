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

  const renderTable = () => {
    if (loading) {
      let skeleton = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

      return skeleton.map((item: any, index: any) => {
        return (
          <tr className="relative pointer-events-none animate-pulse">
            <td className="px-5 py-3 w-0">
              <input type="checkbox" className=""></input>
            </td>

            <td className="w-16 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="ml-2 w-7"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </td>

            <td className=" ">
              <div className="border-t border-gray-200 w-screen  absolute left-0 top-0 " />
              <div className="relative py-2">
                <div className="">
                  <div className="text-lg  leading-none bg-gray-300 rounded-lg w-64 h-4 mb-2"></div>
                  <div className="bg-gray-300 rounded-lg w-1/4 h-4"></div>
                </div>
              </div>
            </td>
            <td>
              <div className=" relative bg-gray-300 rounded-lg w-1/4 h-4"></div>
            </td>
            <td>
              <div className=" relative bg-gray-300 rounded-lg w-1/4 h-4"></div>
            </td>
            <td className="text-right pr-5">
              <div className=" relative bg-gray-300 rounded-lg h-4"></div>
            </td>
          </tr>
        )
      })
    } else if (!loading && !error) {
      return data.products.map((item: any, index: any) => {
        return (
          <tr className="relative hover:bg-purple-200 ">
            <td className="px-5 py-3 w-0">
              <input type="checkbox" className=""></input>
            </td>

            <td className="w-16 text-gray-700">
              {item.images[0] ? (
                <img
                  className="w-11 h-11 object-cover object-center font-light rounded "
                  src={item.images[0]}
                  alt={item.name + ' '}
                ></img>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="ml-2 w-7"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              )}
            </td>

            <td>
              <div className="border-t border-gray-200 w-screen  absolute left-0 top-0 " />
              <div className="relative py-2">
                <div className="w-64">
                  <h2 className="text-lg  leading-none">{item.name}</h2>
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
        <table className="w-full ">
          <thead>
            <tr className="text-gray-800 text-xl">
              <th className="px-5 py-3">
                <input type="checkbox" className=""></input>
              </th>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th className="pr-5 w-0">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 ">{renderTable()}</tbody>
        </table>

        {/* <h1 className="text-2xl relative p-3">All Products</h1>
            {!loading &&
              !error &&
              data.products.map((item: any, index: any) => {
                console.log(item)
                return (
                  <div className="hover:bg-purple-200 relative" key={index}>
                    <div className="border-t border-gray-200 w-full absolute left-0 top-0" />

                    <div className="p-2 flex">
                      <input type="checkbox" className="w-4 mr-4"></input>
                      {item.images[0] && (
                        <img
                          className="w-12 h-12 object-cover object-center"
                          src={item.images[0]}
                          alt={item.name + ' Image'}
                        ></img>
                      )}
                      <div>
                        <h2 className="text-xl leading-none">{item.name}</h2>
                        <span className="text-sm font-light ">
                          {item.category.name}
                        </span>
                      </div>

                      <div className="text-sm ">{item.subcategory.name}</div>
                    </div>
                  </div>
                )
              })} */}
      </TableCard>
    </PageWrapper>
  )
}

export default Products
