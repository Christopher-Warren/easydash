import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ErrorNotifs from './components/modals/ErrorNotifications'

import useLogin from './hooks/useAdminLogin'

import PrimaryButton from './components/buttons/PrimaryButton'
import { ShopHome } from './pages/shop/ShopHome'
import DashboardRouting from './routing/DashboardRouting'

function App() {
  const { login, loading, user, isAdmin, userId, error, logout } = useLogin()

  const { pathname } = useLocation()

  return (
    <>
      <Switch>
        {/* Admin Dashboard Entry */}

        {/* Disableing this fixes bug? */}
        {/* <DashboardRouting
          user={user}
          logout={logout}
          userId={userId}
          login={login}
          loading={loading}
          error={error}
          isAdmin={isAdmin}
        /> */}
        <>
          <Route path="/dashboard/login" exact>
            <Login
              login={login}
              loginError={error}
              loading={loading}
              user={user}
              isAdmin={isAdmin}
            />
          </Route>
          <Route path="/dashboard">{'dash'}</Route>
        </>
        {/* Customer Entry */}
        <Route path="/" exact>
          <ShopHome></ShopHome>
          {console.log('asd?')}

          {/* <Route path="/shop/categories">
            <ShopHome></ShopHome>
          </Route> */}
          {/* <Redirect to="/dashboard" /> */}
          {/* {user.isLoggedIn && (
            <div>
              <h1>You are logged in!</h1>
              <PrimaryButton type="button" onClick={logout}>
                Logout
              </PrimaryButton>
            </div>
          )} */}
          {/* Start here */}
        </Route>
        <Route path="/goal"></Route>
      </Switch>
      {/* Global App Errors */}
      <ErrorNotifs />
    </>
  )
}

export default App
