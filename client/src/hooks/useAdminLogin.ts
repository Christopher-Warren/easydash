import { useMutation, useQuery, gql } from '@apollo/client'

import { isLoggedInVar, isAdminVar } from '../graphql/cache'

import { store } from '../redux/store'
import { addError } from '../redux/error/errorSlice'

const useAdminLogin = () => {
  const [login, { loading, error, data }] = useMutation(
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
        if (login.role === 'ADMIN' || login.role === 'USER') {
          localStorage.setItem('role', login.role)
          isAdminVar(true)
        }

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
  const IS_ADMIN = gql`
    query IsAdmin {
      isAdmin @client
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
      isAdminVar(false)
      isLoggedInVar(false)
      localStorage.removeItem('role')
      localStorage.removeItem('user')

      store.dispatch(addError(data.logout.message))
    },
  })

  const { data: user } = useQuery(IS_LOGGED_IN)
  const { data: isAdminData } = useQuery(IS_ADMIN)
  const isAdmin = isAdminData.isAdmin

  return { login, user, isAdmin, loading, userId, error, logout }
}

export default useAdminLogin
