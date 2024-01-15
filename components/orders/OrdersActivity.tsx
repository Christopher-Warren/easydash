import { useQuery } from '@apollo/client';
import { GET_ALL_ORDERS } from '../../graphql/query_vars';
import { calcRelativeCreatedAt } from '../../utils/calcRelativeCreatedAt';

const OrdersActivity = () => {
  const { data } = useQuery(GET_ALL_ORDERS, {
    variables: {
      input: {
        limit: 10,
        sort: 'createdAt',
        order: -1,
      },
    },
    pollInterval: 5000,
  });

  const RenderRecentOrders = () => {
    if (!data) return null;

    return data.getAllOrders.map((order: any) => {
      const createdAt = calcRelativeCreatedAt(order.createdAt);

      return (
        <li className="px-5 py-1" key={order.orderNumber}>
          <div className="bg-gray-900 absolute h-px  left-0 w-full"></div>
          <div className="inline-block py-3">
            <span className="block text-lg">
              Order #{order.orderNumber}{' '}
              {order.status.paid ? 'paid' : 'processed'}
            </span>
            <span className="block text-gray-500 text-sm">{createdAt}</span>
          </div>
        </li>
      );
    });
  };

  //test2

  return (
    <ol className="text-lg">
      <RenderRecentOrders></RenderRecentOrders>
    </ol>
  );
};

export default OrdersActivity;
