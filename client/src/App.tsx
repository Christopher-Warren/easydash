import { useQuery, gql } from '@apollo/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Dashboard from './Dashboard'
import Login from './Login'

import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { loading, error, data, refetch } = useQuery(gql`
    query {
      validateToken {
        userId
      }
    }
  `)
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          {loading && <LoadingSpinner />}
          {!data ? (
            <Login refetchUser={refetch} />
          ) : (
            <Dashboard refetchUser={refetch} />
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
