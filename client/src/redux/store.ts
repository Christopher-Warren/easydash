import { configureStore } from '@reduxjs/toolkit'
import errorReducer from './error/errorSlice'
import modalReducer from './modal/modalSlice'

export const store = configureStore({
  reducer: {
    error: errorReducer,
    modal: modalReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
