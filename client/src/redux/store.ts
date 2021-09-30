import { configureStore } from '@reduxjs/toolkit'
import errorReducer from './error/errorSlice'

export const store = configureStore({
  reducer: {
    error: errorReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
