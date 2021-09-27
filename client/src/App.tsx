import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './Login'

import useLogin from './hooks/useLogin'

import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { login, loading, user, error } = useLogin()

  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          {loading && <LoadingSpinner />}
          {user.isLoggedIn ? (
            <Dashboard />
          ) : (
            <Login login={login} loginError={error} />
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
