import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ErrorNotifs from './components/ErrorNotifs'

import useLogin from './hooks/useLogin'

import LoadingSpinner from './components/LoadingSpinner'
import FormButton from './components/FormButton'

function App() {
  const { login, loading, user, error, logout } = useLogin()

  // @TODO:
  // We are currently setting is admin appropriately
  return (
    <Router>
      <Switch>
        {/* Admin Dashboard Entry */}
        <Route path="/dashboard">
          {/* {<LoadingSpinner />} */}
          {user.isLoggedIn ? (
            <Dashboard logout={logout} />
          ) : (
            <Login login={login} loginError={error} loading={loading} />
          )}
        </Route>
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
