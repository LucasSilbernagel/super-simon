import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DifficultyState = {
  value: 'EASY' | 'NORMAL' | 'HARD' | 'SUPER SIMON'
}

const initialState = {
  value: 'EASY',
} as DifficultyState

export const difficulty = createSlice({
  name: 'difficulty',
  initialState,
  reducers: {
    updateDifficulty: (state, action: PayloadAction<DifficultyState>) => {
      state.value = action.payload.value
    },
  },
})

export const { updateDifficulty } = difficulty.actions
export default difficulty.reducer
