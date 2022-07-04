import { configureStore } from '@reduxjs/toolkit'
import errorReducer from './error/errorSlice'
import modalReducer from './modal/modalSlice'
import cartReducer from './cart/cartSlice'

export const store = configureStore({
  reducer: {
    error: errorReducer,
    modal: modalReducer,
    cart: cartReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
