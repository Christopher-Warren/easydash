import { useQuery, gql, useMutation } from '@apollo/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './Login'

import useLogin from './hooks/useLogin'

import LoadingSpinner from './components/LoadingSpinner'

function App() {
  // const [login, { loading, error, data }] = useMutation(gql`
  //   mutation($email: String!, $password: String!) {
  //     login(email: $email, password: $password) {
  //       userId
  //     }
  //   }
  // `)
  const { login, loading, user, error } = useLogin()

  console.log('s', user)

  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          {loading && <LoadingSpinner />}
          {!user ? <Login login={login} loginError={error} /> : <Dashboard />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
