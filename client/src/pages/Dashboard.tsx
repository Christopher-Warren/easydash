import SideBar from '../components/SideBar'
import PrimaryButton from '../components/buttons/PrimaryButton'

import Home from './dashboard/Home'

import { Redirect, Route, useHistory, useParams } from 'react-router-dom'
import Products from './dashboard/Products'
import { cache, isLoggedInVar, isAdminVar } from '../graphql/cache'
import Modals from './modals/Modals'

import { useQuery } from '@apollo/client'
import Orders from './dashboard/orders/Orders'
import PageWrapper from '../components/PageWrapper'
import InfoCardLarge from '../components/cards/InfoCardLarge'
import SecondaryButton from '../components/buttons/SecondaryButton'
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
      <div className="lg:pl-20">
        <Route path="/dashboard" exact>
          <Home
            userId={userId}
            products={products}
            orders={orders}
            logout={logout}
          />
          {/* Need to use this button in Products page */}
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
