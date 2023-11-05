import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import Footer from './Footer'
import { renderWithProviders } from '@/app/utils/test-utils'

describe('Footer', () => {
  test('renders correctly when offline', () => {
    renderWithProviders(<Footer />, {
      preloadedState: {
        onlineStatusReducer: { value: false },
        difficultyReducer: { value: 'EASY' },
        gameStatusReducer: { value: 'PAGELOAD' },
      },
    })
    expect(screen.getByTestId('offline-footer')).toBeInTheDocument()
    expect(screen.getByTestId('offline-footer')).toHaveTextContent(
      'Built by Lucas Silbernagel'
    )
  })

  test('renders correctly when online', () => {
    renderWithProviders(<Footer />, {
      preloadedState: {
        onlineStatusReducer: { value: true },
        difficultyReducer: { value: 'EASY' },
        gameStatusReducer: { value: 'PAGELOAD' },
      },
    })
    expect(screen.getByTestId('online-footer')).toBeInTheDocument()
    expect(screen.getByTestId('online-footer')).toHaveTextContent(
      'Built by Lucas Silbernagel'
    )
    expect(screen.getByTestId('portfolio-link')).toBeInTheDocument()
    expect(screen.getByTestId('portfolio-link')).toHaveAttribute(
      'href',
      'https://lucassilbernagel.com/'
    )
  })
})
