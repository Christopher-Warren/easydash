import SideBar from '../components/SideBar'
import PrimaryButton from '../components/PrimaryButton'

import Home from './dashboard/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useLocation,
  Redirect,
} from 'react-router-dom'
import Products from './dashboard/Products'

import Modals from './modals/Modals'
import { useEffect } from 'react'

import { store } from '../redux/store'
import { addError } from '../redux/error/errorSlice'

const Dashboard = ({ logout, userId }: any) => {
  let location = useLocation()

  useEffect(() => {
    //console.log('location changed')
    // if (true) {
    //   store.dispatch(addError('Not authorized'))
    //   // return <Redirect to="/"></Redirect>
    // }
  }, [location])

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
