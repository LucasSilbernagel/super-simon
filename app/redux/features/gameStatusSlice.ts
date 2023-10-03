import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type GameStatusState = {
  value: 'PAGELOAD' | 'UNSTARTED' | 'STARTED' | 'FINISHED'
}

const initialState = {
  value: 'PAGELOAD',
} as GameStatusState

export const gameStatus = createSlice({
  name: 'gameStatus',
  initialState,
  reducers: {
    updateGameStatus: (state, action: PayloadAction<GameStatusState>) => {
      state.value = action.payload.value
    },
  },
})

export const { updateGameStatus } = gameStatus.actions
export default gameStatus.reducer
