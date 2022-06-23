import { Route, Switch, useRouteMatch } from 'react-router-dom'
import SideBar from '../components/SideBar'
import Home from '../pages/dashboard/Home'
import Orders from '../pages/dashboard/orders/Orders'
import ViewOrder from '../pages/dashboard/orders/ViewOrder'
import Products from '../pages/dashboard/Products'
import ValidateUser from '../pages/dashboard/ValidateUser'
import Login from '../pages/Login'
import Modals from '../pages/modals/Modals'

const DashboardRouting = ({ user, logout, userId }: any) => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/login`} exact>
        <Login />
      </Route>

      <Route path={path}>
        <ValidateUser>
          <Route path="/dashboard">
            <Modals />
            <SideBar />
          </Route>

          <Route path="/dashboard" exact>
            <Home />
          </Route>

          <Route path="/dashboard/products" exact>
            <Products></Products>
          </Route>

          <Route path="/dashboard/orders" exact>
            <Orders></Orders>
          </Route>

          <Route path="/dashboard/orders/:id">
            <ViewOrder />
          </Route>
        </ValidateUser>
      </Route>
    </Switch>
  )
}
export default DashboardRouting
