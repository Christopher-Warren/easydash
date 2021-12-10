import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ErrorNotifs from './components/ErrorNotifs'

import useLogin from './hooks/useLogin'

import FormButton from './components/PrimaryButton'

function App() {
  const { login, loading, user, userId, error, logout } = useLogin()

  return (
    <Router>
      <Switch>
        {/* Admin Dashboard Entry */}
        <Route path="/dashboard">
          {/* {<LoadingSpinner />} */}
          {user.isLoggedIn ? (
            <Dashboard logout={logout} userId={userId} />
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
