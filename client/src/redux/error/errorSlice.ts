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
    addError(state: ErrorState, action: PayloadAction<string>) {
      if (state.value.length > 4) state.value.shift()

      state.value.push(action.payload)
    },
    removeError(state, action: PayloadAction<number>) {
      state.value.splice(action.payload, 1)
    },
  },
})

export const { addError, removeError } = errorSlice.actions
export default errorSlice.reducer
