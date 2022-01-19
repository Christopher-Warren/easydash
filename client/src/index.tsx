import React from 'react'
import ReactDOM from 'react-dom'
import './tailwind.css'

import { client } from './graphql/clientInit'
import { ApolloProvider } from '@apollo/client'

import { Provider } from 'react-redux'
import { store } from './redux/store'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div className="dark dark:bg-gray-900 bg-purple-50 h-screen overflow-y-scroll">
          <App />
        </div>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
