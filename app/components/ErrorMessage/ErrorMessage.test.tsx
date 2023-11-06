import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {
  test('renders correctly', () => {
    render(<ErrorMessage errorText="Example error message" />, {})
    expect(screen.getByText('Example error message')).toBeInTheDocument()
  })
})
