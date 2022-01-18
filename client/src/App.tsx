import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ErrorNotifs from './components/ErrorNotifications'

import useLogin from './hooks/useAdminLogin'

import FormButton from './components/PrimaryButton'

function App() {
  const { login, loading, user, isAdmin, userId, error, logout } = useLogin()

  // Check isAdmin here, and redirect customer to '/' if they arent an admin

  const renderDashboard = () => {
    if (user.isLoggedIn && isAdmin) {
      return <Dashboard logout={logout} userId={userId} />
    }

    if (user.isLoggedIn && !isAdmin) {
      return <Redirect to="/" />
    }

    return <Login login={login} loginError={error} loading={loading} />
  }

  return (
    <Router>
      <Switch>
        {/* Admin Dashboard Entry */}
        <Route path="/dashboard">{renderDashboard()}</Route>
        {/* Customer Entry */}
        <Route path="/" exact>
          {user.isLoggedIn && (
            <div>
              <h1>You are logged in!</h1>
              <FormButton type="button" handleClick={logout}>
                Logout
              </FormButton>
            </div>
          )}

          <h1>Welcome to our store!</h1>
        </Route>
      </Switch>
      {/* Global App Errors */}
      <ErrorNotifs />
    </Router>
  )
}

export default App
