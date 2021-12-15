import SideBar from '../components/SideBar'
import PrimaryButton from '../components/PrimaryButton'

import Home from './dashboard/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom'
import Products from './dashboard/Products'

import Modals from './modals/Modals'

const Dashboard = ({ logout, userId }: any) => {
  // document.body.style.overflow = 'visible'

  return (
    <>
      <Route path="/dashboard">
        <Modals />
        <SideBar />
      </Route>
      <div className="lg:ml-20">
        <Route path="/dashboard" exact>
          <Home userId={userId} />
          {/* Need to use this button in Products page */}
          <PrimaryButton type="button" handleClick={logout}>
            Logout
          </PrimaryButton>
        </Route>

        <Route path="/dashboard/products" exact>
          <Products></Products>
        </Route>
      </div>
    </>
  )
}

export default Dashboard
