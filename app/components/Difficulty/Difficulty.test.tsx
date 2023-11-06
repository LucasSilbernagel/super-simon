import '@testing-library/jest-dom'
import { screen, fireEvent } from '@testing-library/react'
import Difficulty, { difficulties } from './Difficulty'
import { renderWithProviders } from '@/app/utils/test-utils'

describe('Difficulty', () => {
  test('renders correctly', () => {
    renderWithProviders(<Difficulty />, {
      preloadedState: {
        onlineStatusReducer: { value: true },
        difficultyReducer: { value: 'EASY' },
        gameStatusReducer: { value: 'PAGELOAD' },
      },
    })
    expect(screen.getByText('Select a difficulty:')).toBeInTheDocument()
    difficulties.forEach((difficulty) => {
      expect(screen.getByText(difficulty)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(difficulties[0]))
    expect(screen.queryByText('Select a difficulty:')).toBeNull()
  })
})
