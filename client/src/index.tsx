import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { client } from './graphql/clientInit'
import { ApolloProvider } from '@apollo/client'

import { Provider } from 'react-redux'
import { store } from './redux/store'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
