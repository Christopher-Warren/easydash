import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { client } from './graphql/clientInit'

import App from './App'

import { ApolloProvider } from '@apollo/client'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
