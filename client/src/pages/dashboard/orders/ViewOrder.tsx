import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import SecondaryButton from '../../../components/buttons/SecondaryButton'

import PageWrapper from '../../../components/PageWrapper'

import { useHistory } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import InfoCardSmall from '../../../components/cards/InfoCardSmall'
import TableCard from '../../../components/cards/TableCard'
import { GET_ORDER } from '../../../graphql/query_vars'

function ViewOrder() {
  let { id }: any = useParams()

  const history = useHistory()

  const { data: { getOrder: order } = {}, loading, error } = useQuery(
    GET_ORDER,
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
      <div className="flex">
        <SecondaryButton onClick={() => history.goBack()} padding="px-5 py-1.5">
          {'<- Back'}
        </SecondaryButton>
      </div>

      {/* Head */}
      <div className="md:flex my-6 dark:text-gray-100 justify-between">
        <div className="">
          <h1 className="text-4xl my-2 font-medium">
            Order #{order.orderNumber}
          </h1>
          <span>Status: {order.status?.paid ? 'Paid' : 'Unpaid'}</span>
        </div>
        {/*  bg-white dark:bg-gray-800  dark:border-gray-700 dark:text-gray-200 rounded-md tracking-wide shadow-lg */}
        <div className="my-6 md:my-0">
          <div className="flex h-full px-4 py-2 items-center border bg-white dark:bg-gray-800  dark:border-gray-700 dark:text-gray-200 rounded-md tracking-wide shadow-lg">
            <div className="w-10 h-10 rounded-full bg-teal-500 mr-3 inline-block"></div>
            <div className="">
              <p className="">Iamaverylongemail@long.com</p>
              <a className="text-blue-500 hover:underline " href="/">
                View Profile
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Layout */}
      <div className="grid md:grid-cols-12 grid-cols-8 gap-6">
        <div className="col-span-8">
          {/* Products */}
          <TableCard className="mb-6">
            <table className="capitalize">
              <thead>
                <tr
                  className={`text-base dark:text-gray-400 text-gray-500 h-14`}
                >
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
                  </th>
                  <th className="lg:w-5/12 px-5 hover:text-gray-700 dark:hover:text-gray-200">
                    Product
                  </th>
                  <th className="w-3/12 hover:text-gray-700 dark:hover:text-gray-200">
                    ID
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
            {/* shipped pants */}
          </TableCard>

          {/* Shipping / Contact */}
          <div className="md:flex gap-6">
            <InfoCardSmall
              className="overflow-x-auto p-5  md:w-1/2 xl:w-7/12 mb-6 md:mb-0"
              title="Shipping"
            >
              <div className="flex justify-between leading-relaxed text-lg">
                <div>
                  <div>Name</div>
                  <p>Address</p>
                </div>

                <div className="whitespace-nowrap">
                  <p>
                    {`${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}
                  </p>
                  <p>{order.shippingInfo.address}</p>
                  <p>{order.shippingInfo.address2}</p>
                  <p>{`${order.shippingInfo.city}, ${order.shippingInfo.state} ${order.shippingInfo.zipcode}`}</p>
                  <p>usa</p>
                </div>
              </div>
            </InfoCardSmall>

            <InfoCardSmall
              className="overflow-x-auto p-5  md:w-1/2 xl:w-5/12  leading-relaxed text-lg"
              title="Contact"
              titleClassName=""
            >
              <div className="my-2">{`${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}</div>
              <a className="my-2" href="/">
                alongemailaddress@email.com
              </a>

              <div className="flex justify-between">
                <div className="pr-2">
                  <div className="my-2">Primary</div>
                  <div className="">Secondary</div>
                </div>

                <div className="whitespace-nowrap text-right font-medium">
                  <p className="my-2"> 1 (555) 555-5555</p>
                  <p className=""> 1 (706) 555-5555</p>
                </div>
              </div>
            </InfoCardSmall>
          </div>
        </div>

        {/* Payment */}
        <InfoCardSmall
          className="overflow-x-auto p-5 md:col-span-4 col-span-full h-min"
          title="Payment"
        >
          <span
            className={`p-1 px-3 ml-5 text-sm absolute right-0 top-0  rounded-full text-gray-800 ${
              order.status.paid ? 'bg-green-400' : 'bg-yellow-300'
            }`}
          >
            {order.status.paid ? 'Fully paid' : 'Unpaid'}
          </span>

          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="children:py-3">
                  <td>Subtotal</td>
                  <td>
                    {order.products.reduce(
                      (acc: any, { qty }: any) => acc + qty,
                      0,
                    )}{' '}
                    item(s)
                  </td>
                  <td className="text-right">
                    {'$' + Number(order.total).toFixed(2)}
                  </td>
                </tr>

                <tr className="children:py-3">
                  <td>Taxes</td>
                  <td>Does not apply</td>
                  <td className="text-right">{'$' + Number(0).toFixed(2)}</td>
                </tr>

                <tr className="children:py-3">
                  <td>Shipping</td>
                  <td>USPS</td>
                  <td className="text-right">{'$' + Number(0).toFixed(2)}</td>
                </tr>

                <tr className="children:pt-3 children:font-medium children:text-lg">
                  <td colSpan={2}>Total</td>
                  <td className="text-right">
                    {'$' + Number(order.total).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoCardSmall>
      </div>
    </PageWrapper>
  )
}

export default ViewOrder
