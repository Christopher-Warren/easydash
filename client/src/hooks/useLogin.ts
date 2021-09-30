import { useMutation, useQuery, gql } from '@apollo/client'

import { isAdminVar, isLoggedInVar } from '../graphql/cache'

import { store } from '../redux/store'
import { addError } from '../redux/error/errorSlice'

const useLogin = () => {
  const [login, { loading, error }] = useMutation(
    gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          userId
          role
        }
      }
    `,
    {
      onCompleted: ({ login }) => {
        localStorage.setItem('user', login.userId as string)
        localStorage.setItem('role', login.role as string)
        isLoggedInVar(true)
        if (login.role === 'ADMIN') {
          isAdminVar(true)
        } else if (login.role === 'USER') {
          isAdminVar(true)
        } else {
          isAdminVar(false)
        }
      },
    },
  )

  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `

  const IS_ADMIN = gql`
    query IsUserLoggedIn {
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

  const [logout] = useMutation(LOGOUT, {
    onCompleted: (data) => {
      isLoggedInVar(false)
      isAdminVar(false)
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      store.dispatch(addError(data.logout.message))
    },
  })

  const { data: isLoggedIn } = useQuery(IS_LOGGED_IN)

  const { data: isAdmin } = useQuery(IS_ADMIN)

  const user = {
    isLoggedIn: isLoggedIn.isLoggedIn,
    isAdmin: isAdmin.isAdmin,
  }
  console.log(user)

  return { login, user, loading, error, logout }
}

export default useLogin
