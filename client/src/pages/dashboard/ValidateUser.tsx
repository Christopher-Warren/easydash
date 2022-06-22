import { Redirect, useLocation } from 'react-router-dom'

const ValidateUser = ({ user, children }: any) => {
  const { pathname } = useLocation()

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
