import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type OnlineStatusState = {
  value: boolean
}

const initialState = {
  value: true,
} as OnlineStatusState
export const onlineStatus = createSlice({
  name: 'isOnline',
  initialState,
  reducers: {
    updateOnlineStatus: (state, action: PayloadAction<OnlineStatusState>) => {
      state.value = action.payload.value
    },
  },
})

export const { updateOnlineStatus } = onlineStatus.actions
export default onlineStatus.reducer
