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
import ModalContainer from '../components/modals/ModalContainer'
import NewProductModal from '../components/modals/NewProductModal'

const Dashboard = ({ logout, userId }: any) => {
  // document.body.style.overflow = 'visible'
  return (
    <>
      <Route path="/dashboard">
        <ModalContainer>
          <NewProductModal />
        </ModalContainer>
        <SideBar />
      </Route>
      <div className="lg:ml-20">
        <Route path="/dashboard" exact>
          <Home userId={userId} />
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
