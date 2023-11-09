import '@testing-library/jest-dom'
import { renderWithProviders } from '../../utils/test-utils'
import { screen, waitFor } from '@testing-library/react'
import Leaderboard from './Leaderboard'
import getCollection from '../../firebase/getData'
import { updateOnlineStatus } from '@/app/redux/features/onlineStatusSlice'

const mockData: {
  [key in 'easy' | 'normal' | 'hard' | 'super-simon']: {
    id: string
    player: string
    score: number
  }[]
} = {
  easy: [{ id: '1', player: 'LAS', score: 10 }],
  normal: [{ id: '2', player: 'AG', score: 20 }],
  hard: [{ id: '3', player: 'AKS', score: 30 }],
  'super-simon': [{ id: '4', player: 'IGS', score: 40 }],
}

// Mock the getData module and its getCollection function
jest.mock('../../firebase/getData', () => ({
  __esModule: true, // this property makes it work as a module
  default: jest.fn(), // mock the default export
}))

// Define the type for the keys of mockData
type Difficulty = keyof typeof mockData

jest.mock('../../utils/getTabsFromFirebase.ts', () => ({
  getTabsFromFirebase: jest.fn((collections) =>
    Object.keys(collections).map((key) => ({
      label: key,
      content: collections[key],
    }))
  ),
}))

describe('Leaderboard Component', () => {
  beforeEach(() => {
    ;(getCollection as jest.Mock).mockImplementation((collectionName: string) =>
      Promise.resolve({
        results: mockData[collectionName as Difficulty],
        error: null,
      })
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays a loader while the leaderboard is loading', () => {
    renderWithProviders(<Leaderboard />, {
      preloadedState: {
        onlineStatusReducer: { value: true },
      },
    })
    waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument()
    })
  })

  it('displays an error message when there is a network error', async () => {
    ;(getCollection as jest.Mock).mockRejectedValueOnce(
      new Error('Network Error')
    )
    renderWithProviders(<Leaderboard />, {
      preloadedState: {
        onlineStatusReducer: { value: true },
      },
    })
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })
  })

  it('displays the leaderboard when data is successfully fetched', async () => {
    ;(getCollection as jest.Mock).mockResolvedValueOnce({
      results: mockData['easy'],
    })
    renderWithProviders(<Leaderboard />, {
      preloadedState: {
        onlineStatusReducer: { value: true },
      },
    })
    // Wait for the loader to disappear indicating that the fetch has completed
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByTestId('leaderboard')).toBeInTheDocument()
      expect(screen.getByText('LAS - 10 points')).toBeInTheDocument()
    })
  })

  it('updates the leaderboard when online status changes', async () => {
    const { store } = renderWithProviders(<Leaderboard />, {
      preloadedState: {
        onlineStatusReducer: { value: false },
      },
    })
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Unable to load the leaderboard because you are offline!'
    )
    // Update online status to true
    store.dispatch(updateOnlineStatus({ value: true }))
    await waitFor(() => {
      // The error message should disappear
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByTestId('leaderboard')).toBeInTheDocument()
    })
  })
})
