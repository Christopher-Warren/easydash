import { Redirect, useLocation } from 'react-router-dom'
import useAdminLogin from '../../hooks/useAdminLogin'

const ValidateUser = ({ children }: any) => {
  const { pathname } = useLocation()

  const { user } = useAdminLogin()

  if (!user.isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: '/dashboard/login', state: { from: pathname } }}
      />
    )
  }
  return children
}

export default ValidateUser
