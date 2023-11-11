import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'
import MuteButton from './MuteButton'
import { renderWithProviders } from '@/app/utils/test-utils'

describe('MuteButton', () => {
  test('renders correctly', () => {
    renderWithProviders(<MuteButton />, {
      preloadedState: {
        onlineStatusReducer: { value: false },
        difficultyReducer: { value: 'EASY' },
        gameStatusReducer: { value: 'PAGELOAD' },
        mutedReducer: { value: false },
      },
    })
    expect(screen.getByTestId('mute-button')).toBeInTheDocument()
    expect(screen.getByTestId('volume-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('mute-icon')).toBeNull()
    fireEvent.click(screen.getByTestId('mute-button'))
    expect(screen.getByTestId('mute-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('volume-icon')).toBeNull()
  })
})
