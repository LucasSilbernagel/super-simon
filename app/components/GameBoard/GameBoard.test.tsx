import '@testing-library/jest-dom'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import GameBoard, { wedges } from './GameBoard'
import { renderWithProviders } from '@/app/utils/test-utils'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

describe('GameBoard', () => {
  test('renders correctly when game status is UNSTARTED', () => {
    renderWithProviders(<GameBoard />, {
      preloadedState: {
        onlineStatusReducer: { value: true },
        difficultyReducer: { value: 'EASY' },
        gameStatusReducer: { value: 'UNSTARTED' },
      },
    })
    waitFor(() => {
      expect(screen.getByTestId('gameboard')).toBeInTheDocument()
      expect(screen.getByTestId('gameboard')).not.toHaveClass(
        'GameBoard--rotating'
      )
      wedges.forEach((wedge, index) => {
        expect(screen.getByTestId(`wedge-${index}`)).toBeInTheDocument()
        expect(screen.getByTestId(`wedge-${index}`)).toHaveClass(wedge.style)
        expect(screen.getByTestId(`wedge-${index}`)).toBeDisabled()
      })
      expect(screen.queryByTestId('player-score')).toBeNull()
      expect(screen.getByText('Start')).toBeInTheDocument()
      fireEvent.click(screen.getByText('Start'))
      expect(screen.queryByText('Start')).toBeNull()
      expect(screen.queryByTestId('endgame-modal')).toBeNull()
    })
  })

  test('renders correctly when game status is STARTED', () => {
    renderWithProviders(<GameBoard />, {
      preloadedState: {
        onlineStatusReducer: { value: true },
        difficultyReducer: { value: 'EASY' },
        gameStatusReducer: { value: 'STARTED' },
      },
    })
    waitFor(() => {
      expect(screen.getByTestId('gameboard')).toBeInTheDocument()
      wedges.forEach((wedge, index) => {
        expect(screen.getByTestId(`wedge-${index}`)).toBeInTheDocument()
        expect(screen.getByTestId(`wedge-${index}`)).toHaveClass(wedge.style)
        expect(screen.getByTestId(`wedge-${index}`)).toBeDisabled()
      })
      expect(screen.queryByText('Start')).toBeNull()
      expect(screen.getByTestId('player-score')).toBeInTheDocument()
      expect(screen.getByTestId('player-score')).toHaveTextContent('0')
      expect(screen.queryByTestId('endgame-modal')).toBeNull()
    })
  })

  test('renders correctly with Super Simon difficulty', () => {
    renderWithProviders(<GameBoard />, {
      preloadedState: {
        onlineStatusReducer: { value: true },
        difficultyReducer: { value: 'SUPER SIMON' },
        gameStatusReducer: { value: 'STARTED' },
      },
    })
    waitFor(() => {
      expect(screen.getByTestId('gameboard')).toBeInTheDocument()
      expect(screen.getByTestId('gameboard')).toHaveClass('GameBoard--rotating')
      expect(screen.getByTestId('player-score')).toBeInTheDocument()
      expect(screen.getByTestId('player-score')).toHaveClass(
        'GameBoard__score--rotating'
      )
      expect(screen.queryByTestId('endgame-modal')).toBeNull()
    })
  })

  test('renders correctly when game status is FINISHED', () => {
    renderWithProviders(<GameBoard />, {
      preloadedState: {
        onlineStatusReducer: { value: true },
        difficultyReducer: { value: 'EASY' },
        gameStatusReducer: { value: 'FINISHED' },
      },
    })
    waitFor(() => {
      expect(screen.getByTestId('gameboard')).toBeInTheDocument()
      wedges.forEach((wedge, index) => {
        expect(screen.getByTestId(`wedge-${index}`)).toBeInTheDocument()
        expect(screen.getByTestId(`wedge-${index}`)).toHaveClass(wedge.style)
        expect(screen.getByTestId(`wedge-${index}`)).toBeDisabled()
      })
      expect(screen.queryByText('Start')).toBeNull()
      expect(screen.getByTestId('player-score')).toBeInTheDocument()
      expect(screen.getByTestId('player-score')).toHaveTextContent('0')
      expect(screen.getByTestId('endgame-modal')).toBeInTheDocument()
    })
  })
})
