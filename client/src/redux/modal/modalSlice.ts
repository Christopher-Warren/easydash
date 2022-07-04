import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  value: number | null
  productId?: string
}
const initialState: ModalState = {
  value: null,
  productId: undefined,
}
// Added prodoctId to allow sending
// of data through state, allowing
// users to edit items
const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal(
      state: ModalState,
      action: PayloadAction<{ value: number | null; productId?: string }>,
    ) {
      const id = Number(action.payload.value)
      state.value = id
      state.productId = action.payload.productId
    },
  },
})

export const { toggleModal } = modalSlice.actions
export default modalSlice.reducer
