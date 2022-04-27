import { gql } from '@apollo/client'

export const EXTEND_TYPE_DEFS = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`
export const IS_ADMIN = gql`
  query IsAdmin {
    isAdmin @client
  }
`
export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`
