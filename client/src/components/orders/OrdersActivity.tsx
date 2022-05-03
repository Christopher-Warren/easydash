import { useQuery } from '@apollo/client'
import { GET_ALL_ORDERS } from '../../graphql/query_vars'

const OrdersActivity = () => {
  const { data, loading, error } = useQuery(GET_ALL_ORDERS, {
    variables: {
      input: {
        limit: 10,
        sort: 'createdAt',
        order: -1,
      },
    },
    pollInterval: 1000,
  })

  //   console.log(data && data)

  const RenderRecentOrders = () => {
    if (!data) return null

    return data.getAllOrders.map((order: any) => {
      return (
        <li className="" key={order.orderNumber}>
          {order.orderNumber}
        </li>
      )
    })
  }

  return (
    <ol className="text-lg pt-3 children:py-2">
      <RenderRecentOrders></RenderRecentOrders>
    </ol>
  )
}

export default OrdersActivity
