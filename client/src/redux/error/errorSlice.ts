import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ErrorState {
  value: string[]
}

const initialState: ErrorState = {
  value: [],
}

const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    addError(state: ErrorState) {
      state.value.push('asd')
    },
  },
})

export const { addError } = errorSlice.actions
export default errorSlice.reducer
