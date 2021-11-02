import { useMutation, useQuery, gql } from '@apollo/client'

import { isLoggedInVar } from '../graphql/cache'

import { store } from '../redux/store'
import { addError } from '../redux/error/errorSlice'

const useLogin = () => {
  const [login, { loading, error }] = useMutation(
    gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          email
          userId
          role
        }
      }
    `,
    {
      onCompleted: ({ login }) => {
        localStorage.setItem('user', login.email as string)
        isLoggedInVar(true)
      },
    },
  )

  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `
  const LOGOUT = gql`
    mutation Logout {
      logout {
        message
      }
    }
  `
  const userId = localStorage.getItem('user')
  const [logout] = useMutation(LOGOUT, {
    onCompleted: (data) => {
      isLoggedInVar(false)
      localStorage.removeItem('user')
      store.dispatch(addError(data.logout.message))
    },
  })

  const { data: user } = useQuery(IS_LOGGED_IN)

  return { login, user, loading, userId, error, logout }
}

export default useLogin
