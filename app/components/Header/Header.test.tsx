import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import Header from './Header'
import { renderWithProviders } from '@/app/utils/test-utils'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

const renderHeaderWithRoute = (route: string) => {
  ;(usePathname as jest.Mock).mockReturnValue(route)
  renderWithProviders(<Header />)
}

describe('Header', () => {
  test('renders correctly on the homepage', () => {
    renderHeaderWithRoute('/')
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByText('Super Simon')).toBeInTheDocument()
    expect(screen.getByTestId('homepage-description')).toBeInTheDocument()
    expect(screen.getByTestId('homepage-description')).toHaveTextContent(
      'The classic memory game Simon, with a twist! How long of a sequence can you remember?'
    )
  })

  test('renders correctly on the leaderboard page', () => {
    renderHeaderWithRoute('/leaderboard')
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()
  })

  test('renders correctly on the 404 page', () => {
    renderHeaderWithRoute('/404')
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(
      screen.getByText(`Sorry, that page couldn't be found!`)
    ).toBeInTheDocument()
  })
})
