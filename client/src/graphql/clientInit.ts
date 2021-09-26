import { ApolloClient, gql, HttpLink, from } from '@apollo/client/'
import { onError } from '@apollo/client/link/error'

import { cache } from './cache'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`

const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'include',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    localStorage.removeItem('user')
    window.location.replace('/dashboard')
  }
})

export const client = new ApolloClient({
  cache: cache,
  typeDefs,
  link: from([errorLink, httpLink]),
})
