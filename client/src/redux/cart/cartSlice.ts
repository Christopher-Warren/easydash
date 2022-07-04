import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartState {
  quantity: number | null
  productId?: string
}
const initialState: any[] = []

console.log('cartSlice init', initialState)
// Added prodoctId to allow sending
// of data through state, allowing
// users to edit items
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state: any[], action: PayloadAction<any>) {
      const productExists = state.find(
        (element: any) => element.productId === action.payload.productId,
      )
      if (productExists) productExists.quantity += action.payload.quantity

      if (!productExists) state.push(action.payload)
    },
  },
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
