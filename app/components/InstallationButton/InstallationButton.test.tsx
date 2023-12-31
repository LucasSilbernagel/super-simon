import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import InstallationButton, {
  IBeforeInstallPromptEvent,
} from './InstallationButton'

const mockBeforeInstallPrompt = () => {
  const event = new Event('beforeinstallprompt') as IBeforeInstallPromptEvent
  event.prompt = jest.fn()
  event.userChoice = Promise.resolve({ outcome: 'accepted', platform: 'web' })
  return event
}

describe('<InstallationButton />', () => {
  beforeEach(() => {
    sessionStorage.clear()
    jest.resetModules()
  })

  it('renders without crashing', () => {
    render(<InstallationButton />)
    waitFor(
      () => {
        expect(screen.getByTestId('installation-button')).toBeInTheDocument()
      },
      { timeout: 4000 }
    )
  })

  it('displays the installation prompt when beforeinstallprompt event is triggered', () => {
    render(<InstallationButton />)
    fireEvent(window, mockBeforeInstallPrompt())
    waitFor(
      () => {
        expect(screen.getByText('Install Super Simon')).toBeInTheDocument()
      },
      { timeout: 4000 }
    )
  })

  it('hides the installation prompt when the dismiss button is clicked', async () => {
    render(<InstallationButton />)
    waitFor(
      () => {
        fireEvent(window, mockBeforeInstallPrompt())
        fireEvent.click(
          screen.getByLabelText('Do not install Super Simon on my device')
        )
      },
      { timeout: 4000 }
    )
    await waitFor(
      () => {
        expect(
          screen.queryByText('Install Super Simon')
        ).not.toBeInTheDocument()
        expect(sessionStorage.getItem('hideInstallationPrompt')).toBe('true')
      },
      { timeout: 4000 }
    )
  })

  it('handles the install button click', async () => {
    render(<InstallationButton />)
    const beforeInstallPromptEvent = mockBeforeInstallPrompt()
    fireEvent(window, beforeInstallPromptEvent)
    waitFor(
      () => {
        const installButton = screen.getByText('Install Super Simon')
        fireEvent.click(installButton)
      },
      { timeout: 4000 }
    )
    await waitFor(
      () => {
        expect(beforeInstallPromptEvent.prompt).toHaveBeenCalled()
      },
      { timeout: 4000 }
    )
  })

  it('does not display installation prompt if sessionStorage has hideInstallationPrompt set to true', () => {
    sessionStorage.setItem('hideInstallationPrompt', 'true')
    render(<InstallationButton />)
    fireEvent(window, mockBeforeInstallPrompt())
    expect(screen.queryByText('Install Super Simon')).not.toBeInTheDocument()
  })
})
