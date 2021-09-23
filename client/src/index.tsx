import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { cache } from './graphql/cache'

import App from './App'

// apollo
import { ApolloClient, ApolloProvider, gql } from '@apollo/client'
export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`

const client = new ApolloClient({
  uri: '/graphql',
  cache: cache,
  credentials: 'include',
  typeDefs,
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
