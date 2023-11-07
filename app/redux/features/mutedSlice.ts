import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type MutedState = {
  value: boolean
}

const initialState = {
  value: false,
} as MutedState
export const muted = createSlice({
  name: 'isMuted',
  initialState,
  reducers: {
    updateIsMuted: (state, action: PayloadAction<MutedState>) => {
      state.value = action.payload.value
    },
  },
})

export const { updateIsMuted } = muted.actions
export default muted.reducer
