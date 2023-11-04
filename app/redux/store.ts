import { configureStore } from '@reduxjs/toolkit'
import difficultyReducer from './features/difficultySlice'
import gameStatusReducer from './features/gameStatusSlice'
import onlineStatusReducer from './features/onlineStatusSlice'

export const store = configureStore({
  reducer: {
    difficultyReducer,
    gameStatusReducer,
    onlineStatusReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
