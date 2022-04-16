import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ErrorNotifs from './components/modals/ErrorNotifications'

import useLogin from './hooks/useAdminLogin'

import PrimaryButton from './components/buttons/PrimaryButton'

import { isAdminVar, isLoggedInVar } from './graphql/cache'

function App() {
  const { login, loading, user, isAdmin, userId, error, logout } = useLogin()

  // Check isAdmin here, and redirect customer to '/' if they arent an admin

  const { pathname } = useLocation()

  const renderDashboard = () => {
    if (!user.isLoggedIn) {
      return (
        <Redirect
          to={{ pathname: '/dashboard/login', state: { from: pathname } }}
        />
      )
    }
    console.log(user.isLoggedIn, isAdmin)
    return <Dashboard logout={logout} userId={userId} />
  }

  return (
    <>
      <Switch>
        {/* Admin Dashboard Entry */}
        <Route path="/dashboard/login" exact>
          <Login
            login={login}
            loginError={error}
            loading={loading}
            user={user}
            isAdmin={isAdmin}
          />
        </Route>
        <Route path="/dashboard">{renderDashboard()}</Route>

        {/* Customer Entry */}
        <Route path="/" exact>
          {user.isLoggedIn && (
            <div>
              <h1>You are logged in!</h1>
              <PrimaryButton type="button" onClick={logout}>
                Logout
              </PrimaryButton>
            </div>
          )}

          <h1>Welcome to our store!</h1>
        </Route>
      </Switch>
      {/* Global App Errors */}
      <ErrorNotifs />
    </>
  )
}

export default App
