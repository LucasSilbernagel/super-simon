import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IBeforeInstallPromptEvent extends Event {
  prompt(): unknown
  showPrompt: () => void
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

type InstallationPromptState = {
  value: IBeforeInstallPromptEvent | null
}

const initialState = {
  value: null,
} as InstallationPromptState
export const installationPrompt = createSlice({
  name: 'installationPrompt',
  initialState,
  reducers: {
    updateInstallationPrompt: (
      state,
      action: PayloadAction<InstallationPromptState>
    ) => {
      state.value = action.payload.value
    },
  },
})

export const { updateInstallationPrompt } = installationPrompt.actions
export default installationPrompt.reducer
