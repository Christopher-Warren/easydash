import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ErrorNotifs from './components/ErrorNotifs'

import useLogin from './hooks/useLogin'

import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { login, loading, user, error, logout } = useLogin()

  return (
    <Router>
      <Switch>
        {/* Admin Dashboard Entry */}
        <Route path="/dashboard">
          {loading && <LoadingSpinner />}
          {user.isLoggedIn ? (
            <Dashboard logout={logout} />
          ) : (
            <Login login={login} loginError={error} />
          )}
        </Route>
        {/* Customer Entry */}
        <Route path="/" exact>
          <h1>Welcome to our store!</h1>
        </Route>
      </Switch>
      {/* Global App Errors */}
      <ErrorNotifs />
    </Router>
  )
}

export default App
