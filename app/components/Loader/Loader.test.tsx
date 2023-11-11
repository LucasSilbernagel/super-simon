import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Loader from './Loader'

describe('Loader', () => {
  test('renders correctly', () => {
    render(<Loader />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.getByTestId('loader')).toHaveClass('Loader')
  })
})
