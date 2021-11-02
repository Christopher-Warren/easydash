import SideBar from '../components/SideBar'
import FormButton from '../components/FormButton'

import Home from './dashboard/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom'

const Dashboard = ({ logout, userId }: any) => {
  return (
    <>
      <Route path="/dashboard">
        <SideBar />
      </Route>
      <div className="ml-20">
        <Route path="/dashboard" exact>
          <Home userId={userId} />
          <FormButton type="button" handleClick={logout}>
            Logout
          </FormButton>
        </Route>

        <Route path="/dashboard/products" exact>
          prods
          <FormButton type="button" handleClick={logout}>
            Logout
          </FormButton>
        </Route>
      </div>
    </>
  )
}

export default Dashboard
