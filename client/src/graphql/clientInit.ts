import { ApolloClient, gql, HttpLink, from } from '@apollo/client/'
import { onError } from '@apollo/client/link/error'

import { cache } from './cache'

import { addError } from '../redux/error/errorSlice'

import { store } from '../redux/store'

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
    graphQLErrors.forEach((error) => {
      console.log(error)
      store.dispatch(addError(error.message))
    })
    // localStorage.removeItem('user')
    // isLoggedInVar(false)
  }
})

export const client = new ApolloClient({
  cache: cache,
  typeDefs,
  link: from([errorLink, httpLink]),
})
