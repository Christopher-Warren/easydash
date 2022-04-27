import { useMutation, useQuery } from '@apollo/client'

import { isLoggedInVar, isAdminVar } from '../graphql/cache'

import { store } from '../redux/store'
import { addError } from '../redux/error/errorSlice'

import { useHistory } from 'react-router-dom'
import { USER_LOGIN } from '../graphql/mutation_vars'
import { IS_ADMIN, IS_LOGGED_IN, LOGOUT } from '../graphql/types_extension'

const useAdminLogin = () => {
  const history = useHistory()

  const [login, { loading, error, data }] = useMutation(USER_LOGIN, {
    onCompleted: ({ login }) => {
      if (login.role === 'ADMIN' || login.role === 'USER') {
        localStorage.setItem('role', login.role)
        isAdminVar(true)
      }

      localStorage.setItem('user', login.email as string)
      isLoggedInVar(true)
    },
  })

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
