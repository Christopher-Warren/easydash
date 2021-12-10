import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  value: boolean
}
const initialState: ModalState = {
  value: false,
}

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal(state: ModalState) {
      state.value = !state.value
    },
  },
})

export const { toggleModal } = modalSlice.actions
export default modalSlice.reducer
