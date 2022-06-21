import { Redirect, Route, useLocation } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'

const DashboardRouting = ({
  user,
  logout,
  userId,
  login,
  loading,
  error,
  isAdmin,
}: any) => {
  const { pathname } = useLocation()
  const renderDashboard = () => {
    if (!user.isLoggedIn) {
      return (
        <Redirect
          to={{ pathname: '/dashboard/login', state: { from: pathname } }}
        />
      )
    }
    return <Dashboard logout={logout} userId={userId} />
  }

  return (
    <>
      <Route path="/dashboard/login" exact>
        asd
        <Login
          login={login}
          loginError={error}
          loading={loading}
          user={user}
          isAdmin={isAdmin}
        />
      </Route>
      <Route path="/dashboard">{renderDashboard()}</Route>
    </>
  )
}
export default DashboardRouting
