import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import difficultyReducer from './features/difficultySlice'
import gameStatusReducer from './features/gameStatusSlice'
import onlineStatusReducer from './features/onlineStatusSlice'
import mutedReducer from './features/mutedSlice'

const rootReducer = combineReducers({
  difficultyReducer,
  gameStatusReducer,
  onlineStatusReducer,
  mutedReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
