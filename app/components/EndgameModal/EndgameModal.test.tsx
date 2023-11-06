import '@testing-library/jest-dom'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import EndgameModal from './EndgameModal'
import { renderWithProviders } from '@/app/utils/test-utils'
import ReactModal from 'react-modal'
ReactModal.setAppElement('*')

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

describe('EndgameModal', () => {
  const mockProps = {
    isModalOpen: true,
    categoryScores: [
      {
        id: 'kCItRdzyZkPKTLgvnqfp',
        player: 'LAS',
        score: 7,
      },
      {
        id: 'M5f5VDEykjGgt2IhX930',
        player: 'LAS',
        score: 6,
      },
    ],
    playerScore: 3,
    setIsModalOpen: () => null,
    setBotSequence: () => null,
    setPlayerSequence: () => null,
    setGameboardError: () => null,
    setPlayerScore: () => null,
  }

  test('renders correctly when offline', () => {
    renderWithProviders(<EndgameModal {...mockProps} />, {
      preloadedState: {
        onlineStatusReducer: { value: false },
        difficultyReducer: { value: 'EASY' },
        gameStatusReducer: { value: 'FINISHED' },
      },
    })
    expect(screen.getByTestId('endgame-modal')).toBeInTheDocument()
    expect(screen.getByTestId('close-modal-button')).toBeInTheDocument()
    expect(screen.getByText('Game over!')).toBeInTheDocument()
    expect(screen.getByText('Score: 3')).toBeInTheDocument()
    expect(screen.getByText('Play again?')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Play again?'))
    waitFor(() => {
      expect(screen.queryByTestId('endgame-modal')).toBeNull()
    })
  })

  test('renders correctly when online', () => {
    renderWithProviders(<EndgameModal {...mockProps} />, {
      preloadedState: {
        onlineStatusReducer: { value: true },
        difficultyReducer: { value: 'EASY' },
        gameStatusReducer: { value: 'FINISHED' },
      },
    })
    expect(screen.getByTestId('endgame-modal')).toBeInTheDocument()
    expect(screen.getByTestId('close-modal-button')).toBeInTheDocument()
    expect(screen.getByText('Game over!')).toBeInTheDocument()
    expect(screen.getByText('Score: 3')).toBeInTheDocument()
    expect(screen.queryByText('Play again?')).toBeNull()
    expect(screen.getByTestId('new-score-form')).toBeInTheDocument()
    expect(screen.getByTestId('initials-input')).toBeInTheDocument()
    expect(screen.getByText('Submit score')).toBeInTheDocument()
    expect(screen.getByText('Submit score')).toBeDisabled()
    fireEvent.change(screen.getByTestId('initials-input'), {
      target: { value: 'LAS' },
    })
    expect(screen.getByText('Submit score')).toBeEnabled()
    fireEvent.click(screen.getByText('Submit score'))
    waitFor(() => {
      expect(screen.queryByTestId('endgame-modal')).toBeNull()
    })
  })
})
