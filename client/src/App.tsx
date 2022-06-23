import { Switch, Route } from 'react-router-dom'

import ErrorNotifs from './components/modals/ErrorNotifications'

import { ShopHome } from './pages/shop/ShopHome'
import DashboardRouting from './routing/DashboardRouting'

function App() {
  return (
    <>
      <Switch>
        {/* Admin Dashboard Entry */}
        <Route path="/dashboard">
          <DashboardRouting />
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
