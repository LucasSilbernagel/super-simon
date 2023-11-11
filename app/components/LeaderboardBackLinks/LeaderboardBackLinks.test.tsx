import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import LeaderboardBackLinks from './LeaderboardBackLinks'

describe('LeaderboardBackLinks', () => {
  test('renders correctly', () => {
    render(<LeaderboardBackLinks />)
    expect(screen.getByTestId('leaderboard-back-links')).toBeInTheDocument()
    expect(screen.getByTestId('back-link')).toBeInTheDocument()
    expect(screen.getByTestId('back-link')).toHaveTextContent('Back')
    expect(screen.getByTestId('back-link')).toHaveAttribute('href', '/')
    expect(screen.getByTestId('play-again-link')).toBeInTheDocument()
    expect(screen.getByTestId('play-again-link')).toHaveTextContent(
      'Play again'
    )
    expect(screen.getByTestId('play-again-link')).toHaveAttribute('href', '/')
  })
})
