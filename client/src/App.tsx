import { useQuery, gql } from '@apollo/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Dashboard from './Dashboard'
import Login from './Login'

function App() {
  const { loading, error, data, refetch } = useQuery(gql`
    query {
      validateToken {
        userId
      }
    }
  `)
  console.log(data)
  // function ExchangeRates() {
  //   const { loading, error, data } = useQuery(gql`
  //     query {
  //       events {
  //         title
  //         description
  //       }
  //     }
  //   `)

  //   if (loading) return <p>Loading...</p>
  //   if (error) return <p>Error :</p>

  //   return data.events.map(({ title, description }: any, i: any) => (
  //     <div key={i}>
  //       <p>
  //         {title}: {description}
  //       </p>
  //     </div>
  //   ))
  // }

  function renderPage() {
    if (!data) return <Login props={refetch} />
    return <Dashboard />
  }
  console.log('render')
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">{renderPage()}</Route>
      </Switch>
    </Router>
  )
}

export default App
