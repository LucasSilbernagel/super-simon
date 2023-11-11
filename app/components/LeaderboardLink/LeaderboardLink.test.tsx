import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import LeaderboardLink from './LeaderboardLink'
import { renderWithProviders } from '@/app/utils/test-utils'

describe('LeaderboardLink', () => {
  test('renders correctly when online', () => {
    renderWithProviders(<LeaderboardLink />, {
      preloadedState: {
        onlineStatusReducer: { value: true },
        difficultyReducer: { value: 'EASY' },
        gameStatusReducer: { value: 'PAGELOAD' },
      },
    })
    expect(screen.getByTestId('leaderboard-link')).toBeInTheDocument()
    expect(screen.getByTestId('leaderboard-link')).toHaveTextContent(
      'Leaderboard'
    )
    expect(screen.getByTestId('leaderboard-link')).toHaveAttribute(
      'href',
      '/leaderboard'
    )
  })

  test('does not render when offline', () => {
    renderWithProviders(<LeaderboardLink />, {
      preloadedState: {
        onlineStatusReducer: { value: false },
        difficultyReducer: { value: 'EASY' },
        gameStatusReducer: { value: 'PAGELOAD' },
      },
    })
    expect(screen.queryByTestId('leaderboard-link')).toBeNull()
  })
})
