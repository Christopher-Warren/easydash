import SideBar from '../components/SideBar'

import Home from './dashboard/Home'

import { Route } from 'react-router-dom'
import Products from './dashboard/Products'

import Modals from './modals/Modals'

import { useQuery } from '@apollo/client'
import Orders from './dashboard/orders/Orders'

import ViewOrder from './dashboard/orders/ViewOrder'
import { GET_ALL_ORDERS, GET_PRODUCTS } from '../graphql/query_vars'

const Dashboard = ({ logout, userId }: any) => {
  const products = useQuery(GET_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
  })

  const orders = useQuery(GET_ALL_ORDERS, {
    notifyOnNetworkStatusChange: true,
    pollInterval: 5000,
  })

  return (
    <>
      <Route path="/dashboard">
        <Modals products={products} orders={orders} />
        <SideBar />
      </Route>
      <div className=" bg-gray-900">
        <Route path="/dashboard" exact>
          <Home
            userId={userId}
            products={products}
            orders={orders}
            logout={logout}
          />
        </Route>

        <Route path="/dashboard/products" exact>
          <Products products={products}></Products>
        </Route>

        <Route path="/dashboard/orders" exact>
          <Orders products={products} orders={orders}></Orders>
        </Route>

        <Route path="/dashboard/orders/:id" children={<ViewOrder />} />
      </div>
    </>
  )
}

export default Dashboard
