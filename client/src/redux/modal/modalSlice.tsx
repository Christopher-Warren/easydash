import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  value: number
}
const initialState: ModalState = {
  value: 0,
}

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal(state: ModalState, action: PayloadAction<number>) {
      const id = Number(action.payload)
      state.value = id
      console.log('redux', typeof state.value)
    },
  },
})

export const { toggleModal } = modalSlice.actions
export default modalSlice.reducer
