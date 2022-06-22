import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ValidateUser from '../pages/dashboard/ValidateUser'
import Login from '../pages/Login'

const DashboardRouting = ({
  user,
  logout,
  userId,
  login,
  loading,
  error,
  isAdmin,
}: any) => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path="/dashboard/login" exact>
        <Login
          login={login}
          loginError={error}
          loading={loading}
          user={user}
          isAdmin={isAdmin}
        />
      </Route>
      <Route exact path={path}>
        <ValidateUser user={user}>
          <Dashboard />
        </ValidateUser>
      </Route>
      <Route path={`${path}/test`}>asd</Route>
    </Switch>
  )
}
export default DashboardRouting
