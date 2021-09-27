// Ducks pattern

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

interface ErrorState {
  value: string[]
}

const initialState: CounterState = {
  value: 0,
}

const initialState1: ErrorState = {
  value: [],
}

const errorSlice = createSlice({
  name: 'errors',
  initialState: initialState1,
  reducers: {
    addError(state: ErrorState) {
      state.value.push('asd')
    },
  },
})

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    //increment
    incremented(state: CounterState) {
      state.value++
    },
    amountAdded(state: CounterState, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})

export const { incremented, amountAdded } = counterSlice.actions

export const { addError } = errorSlice.actions

export default counterSlice.reducer

// need to find a way to export errorSlice.reducer
// export const errorSlice.reducer
