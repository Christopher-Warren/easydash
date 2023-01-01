import { Switch, Route } from 'react-router-dom'

import ErrorNotifs from './components/modals/ErrorNotifications'

import { ShopHome } from './pages/shop/ShopHome'
import DashboardRouting from './routing/DashboardRouting'
import StorefrontRouting from './routing/StorefrontRouting'

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
          <StorefrontRouting />
        </Route>
        <Route path="/goal"></Route>
      </Switch>
      {/* Global App Errors */}
      <ErrorNotifs />
    </>
  )
}

export default App
