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
        <table className="w-full">
          <thead>
            <tr className="text-gray-800 text-xl">
              <th className="px-5 py-3">
                <input type="checkbox" className=""></input>
              </th>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th className="pr-3">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {!loading &&
              !error &&
              data.products.map((item: any, index: any) => {
                console.log(item)
                return (
                  <tr className="relative hover:bg-purple-200 ">
                    <td className="px-5 py-3 w-0">
                      <input type="checkbox" className=""></input>
                    </td>

                    <td className="w-16">
                      <img
                        className="w-12 h-12 object-cover object-center font-light"
                        src={item.images[0] ? item.images[0] : ''}
                        alt={item.name + ' '}
                      ></img>
                    </td>

                    <td className="">
                      <div className="border-t border-gray-200 w-screen  absolute left-0 top-0 " />
                      <div className="relative py-2">
                        <div>
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
                    <td className="">
                      <div className=" relative">{item.price}</div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
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
