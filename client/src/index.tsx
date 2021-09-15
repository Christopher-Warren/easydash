import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import App from './App'
import Dashboard from './Dashboard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <App />
        </Switch>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
