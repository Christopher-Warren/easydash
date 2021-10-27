import FormButton from '../components/FormButton'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom'

import SideBar from '../components/SideBar'

const Dashboard = ({ logout }: any) => {
  return (
    <>
      <Route path="/dashboard">
        <SideBar />
      </Route>
      <div className="ml-20">
        <Route path="/dashboard" exact>
          home
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
