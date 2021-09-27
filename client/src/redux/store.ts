import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import errorReducer from './error/errorSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    error: errorReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
