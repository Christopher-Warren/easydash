import SideBar from '../components/SideBar'
import PrimaryButton from '../components/buttons/PrimaryButton'

import Home from './dashboard/Home'

import { Route } from 'react-router-dom'
import Products from './dashboard/Products'

import Modals from './modals/Modals'

import { useQuery, gql } from '@apollo/client'

const Dashboard = ({ logout, userId }: any) => {
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
      </div>
    </>
  )
}

export default Dashboard
