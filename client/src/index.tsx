import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Dashboard from './Dashboard'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <App />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)
