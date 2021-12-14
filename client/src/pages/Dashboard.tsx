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

import { useAppSelector } from '../redux/hooks'

import { Forms } from '../enums'

// import from '../redux/modal/modalSlice'

console.log(Forms.newProduct)

const Dashboard = ({ logout, userId }: any) => {
  // document.body.style.overflow = 'visible'

  const showModal = useAppSelector((state) => state.modal.value)

  console.log(showModal, Forms.newProduct)

  return (
    <>
      <Route path="/dashboard">
        {showModal === Forms.newProduct && <NewProductModal />}
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
