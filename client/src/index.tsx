import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { client } from './graphql/clientInit'

import App from './App'

import { ApolloProvider } from '@apollo/client'

import { useAppDispatch, useAppSelector } from './redux/hooks'
import { incremented, amountAdded } from './redux/counter/counterSlice'

import { Provider } from 'react-redux'
import { store } from './redux/store'

const ErrorNotifs = () => {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <h1 className="">there was an error processing your request.{count}</h1>
      <button onClick={() => dispatch(amountAdded(3))}>Add</button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ErrorNotifs />

        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
