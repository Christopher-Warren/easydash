import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  value: number | null
}
const initialState: ModalState = {
  value: null,
}

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal(state: ModalState, action: PayloadAction<number | null>) {
      const id = Number(action.payload)
      state.value = id
    },
  },
})

export const { toggleModal } = modalSlice.actions
export default modalSlice.reducer
