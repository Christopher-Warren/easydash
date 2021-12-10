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
import NewProductModal from '../components/modals/NewProductModal'

import { useAppSelector, useAppDispatch } from '../redux/hooks'

import { toggleModal } from '../redux/modal/modalSlice'

// import from '../redux/modal/modalSlice'

const Dashboard = ({ logout, userId }: any) => {
  // document.body.style.overflow = 'visible'

  const appError = useAppSelector((state) => state.modal.value)
  const dispatch = useAppDispatch()
  console.log(appError)
  return (
    <>
      <Route path="/dashboard">
        {appError && <NewProductModal />}
        <SideBar />
      </Route>
      <div className="lg:ml-20">
        <Route path="/dashboard" exact>
          <Home userId={userId} />
          {/* Need to use this button in Products page */}
          <PrimaryButton
            type="button"
            handleClick={(e: any) => dispatch(toggleModal())}
          >
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
