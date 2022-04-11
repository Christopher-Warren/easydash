import SideBar from '../components/SideBar'
import PrimaryButton from '../components/buttons/PrimaryButton'

import Home from './dashboard/Home'

import { Route, useHistory, useParams } from 'react-router-dom'
import Products from './dashboard/Products'

import Modals from './modals/Modals'

import { useQuery, gql } from '@apollo/client'
import Orders from './dashboard/orders/Orders'
import PageWrapper from '../components/PageWrapper'
import InfoCardLarge from '../components/cards/InfoCardLarge'
import SecondaryButton from '../components/buttons/SecondaryButton'
import ViewOrder from './dashboard/orders/ViewOrder'

const Dashboard = ({ logout, userId }: any) => {
  const history = useHistory()
  const products = useQuery(
    gql`
      query getProducts($input: GetProductInput) {
        products(input: $input) {
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
          description
          _id
        }
      }
    `,
    {
      notifyOnNetworkStatusChange: true,
    },
  )

  const orders = useQuery(
    gql`
      query getAllOrders($input: GetAllOrdersInput) {
        getAllOrders(input: $input) {
          _id
          orderNumber
          total
          status {
            processed
            paid
            fulfilled
          }
        }
      }
    `,
    {
      notifyOnNetworkStatusChange: true,
    },
  )

  return (
    <>
      <Route path="/dashboard">
        <Modals products={products} />
        <SideBar />
      </Route>
      <div className="lg:pl-20">
        <Route path="/dashboard" exact>
          <Home userId={userId} />
          {/* Need to use this button in Products page */}
          <PrimaryButton className="py-2 px-4" type="button" onClick={logout}>
            Logout
          </PrimaryButton>
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
