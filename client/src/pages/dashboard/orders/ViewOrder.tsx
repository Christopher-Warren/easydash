import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import SecondaryButton from '../../../components/buttons/SecondaryButton'
import InfoCardLarge from '../../../components/cards/InfoCardLarge'
import PageWrapper from '../../../components/PageWrapper'

import { useHistory } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import InfoCardSmall from '../../../components/cards/InfoCardSmall'
import TableCard from '../../../components/cards/TableCard'

function ViewOrder() {
  let { id }: any = useParams()

  const history = useHistory()

  const { data: { getOrder: order } = {}, loading, error } = useQuery(
    gql`
      query getOrder($input: ID!) {
        getOrder(input: $input) {
          _id
          orderNumber
          total
          products {
            qty
            sum
            product {
              _id
              name
              price
              images
            }
          }
          status {
            paid
            processed
            fulfilled
          }
          billingInfo {
            firstName
            lastName
            country
            country
            city
            zipcode
            address
            address2
          }
          shippingInfo {
            firstName
            lastName
            country
            country
            city
            zipcode
            address
            address2
          }
        }
      }
    `,
    {
      variables: {
        input: id,
      },
    },
  )

  if (!order && !loading) return <div>404</div>

  if (!order) return <LoadingSpinner />

  const RenderTableItems = () => {
    if (!loading && !error) {
      return order.products.map((item: any, index: any) => {
        return (
          <tr
            className={` hover:bg-purple-200 hover:dark:bg-gray-700 dark:odd:bg-slate-800  odd:border-y dark:border-gray-700 border-gray-200`}
            key={index}
          >
            <td className=" md:table-cell hidden  px-3 ">
              <div className="border dark:border-gray-100/25 rounded-sm dark:text-gray-100/60 w-10 h-10 p-1 ">
                {item.product.images[0] ? (
                  <img
                    className="object-cover object-center font-light rounded-sm h-full w-full"
                    src={item.product.images[0]}
                    // src="https://via.placeholder.com/40"
                    alt={item.product.orderNumber + 'image'}
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
            <td className="p-5 relative">
              <div className="">
                <div className="">
                  <h2 className="text-base  leading-tight">
                    {item.product.name}
                  </h2>
                </div>
              </div>
            </td>
            <td className="">
              <div className=" relative">{item.product._id}</div>
            </td>
            <td className="">
              <div className=" relative">{item.qty}</div>
            </td>
            <td className="text-right lg:pr-8 pr-3.5">
              <div className="relative dark:text-green-200">{`$${item.product.price}`}</div>
            </td>
            <td className="text-right lg:pr-8 pr-3.5">
              <div className="relative dark:text-green-200">{`$${
                item.product.price * item.qty
              }`}</div>
            </td>
          </tr>
        )
      })
    }
  }

  return (
    <PageWrapper>
      <div className="flex my-5">
        <SecondaryButton
          onClick={() => history.goBack()}
          padding="px-5 py-1.5 mr-5"
        >
          {'<-Back'}
        </SecondaryButton>
      </div>
      <div className="my-5 dark:text-gray-100">
        <h1 className="text-4xl my-2 font-medium  ">
          Order #{order.orderNumber}
        </h1>
        <span>Status: {order.status?.paid ? 'paid' : 'unpaid'}</span>
      </div>

      <TableCard>
        <table className="table-auto w-full capitalize">
          <thead>
            <tr className={`text-base dark:text-gray-400 text-gray-500 h-14`}>
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

              <th className="lg:w-5/12 px-5 hover:text-gray-700 dark:hover:text-gray-200">
                Name
              </th>
              <th className="w-3/12 hover:text-gray-700 dark:hover:text-gray-200">
                Product ID
              </th>
              <th className="w-1/12 hover:text-gray-700 dark:hover:text-gray-200">
                Qty.
              </th>
              <th className="text-right lg:pr-8 pr-3.5 hover:text-gray-700 dark:hover:text-gray-200">
                Price
              </th>
              <th className="text-right lg:pr-8 pr-3.5 hover:text-gray-700 dark:hover:text-gray-200">
                Total
              </th>
            </tr>
          </thead>

          <tbody className="text-base">
            <RenderTableItems />
          </tbody>
        </table>
      </TableCard>
      <div className="grid sm:grid-cols-12 gap-20 mt-14">
        <InfoCardSmall className="col-span-5 " title="Payment status">
          <div className="grid grid-cols-3    w-full  children:col-span-1">
            <h2>subtotal</h2>
            <h2>1 item</h2>
            <h2 className="text-right">1515</h2>

            <h2>taxes</h2>
            <h2>1 item</h2>
            <h2 className="text-right">1515</h2>

            <h2>subtotal</h2>
            <h2>1 item</h2>
            <h2 className="text-right">1515</h2>
            <h2 className="!col-span-full text-right">total</h2>
          </div>
        </InfoCardSmall>
        <InfoCardSmall
          className="col-span-7 h-32"
          title="Shipping"
        ></InfoCardSmall>
      </div>
    </PageWrapper>
  )
}

export default ViewOrder
