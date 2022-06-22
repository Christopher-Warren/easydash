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

  // function App() {
  //   const { login, loading, user, isAdmin, userId, error, logout } = useLogin()

  //   const { pathname } = useLocation()
  //   let { path, url } = useRouteMatch()
  //   return (
  //     <Switch>
  //       <Route path="/">
  //         <Switch>
  //           <Route path="/dashboard" exact>
  //             <p>wowowow</p>
  //           </Route>
  //         </Switch>
  //         <Switch>
  //           <Route path="/home" exact>
  //             <p>wowowow222222</p>
  //           </Route>
  //         </Switch>
  //       </Route>
  //     </Switch>
  //   )
  // }

  return (
    <>
      <Switch>
        {/* Admin Dashboard Entry */}
        <Route path="/dashboard">
          <DashboardRouting
            user={user}
            logout={logout}
            userId={userId}
            login={login}
            loading={loading}
            error={error}
            isAdmin={isAdmin}
          />
        </Route>

        {/* Customer Entry */}
        <Route path="/">
          <Switch>
            <Route path="/">
              <ShopHome></ShopHome>
            </Route>
          </Switch>
        </Route>
        <Route path="/goal"></Route>
      </Switch>
      {/* Global App Errors */}
      <ErrorNotifs />
    </>
  )
}

export default App
