import '@testing-library/jest-dom'
import Tabs, { MOBILE_TAB_COUNT } from './Tabs'
import { render, screen, fireEvent, within } from '@testing-library/react'

describe('Tabs', () => {
  test('Renders correctly', () => {
    const mockProps = {
      tabs: [
        {
          label: 'Tab 1',
          content: 'Tab 1 Content',
        },
        {
          label: 'Tab 2',
          content: 'Tab 2 Content',
        },
        {
          label: 'Tab 3',
          content: 'Tab 3 Content',
        },
        {
          label: 'Tab 4',
          content: 'Tab 4 Content',
        },
      ],
    }

    render(<Tabs tabs={mockProps.tabs} />)

    expect(screen.getAllByTestId('tab-button').length).toBe(
      mockProps.tabs.length
    )
    expect(screen.getAllByTestId('tab-button-mobile').length).toBe(
      MOBILE_TAB_COUNT
    )

    expect(screen.getByTestId('tab-dropdown-toggle')).toBeInTheDocument()

    const largerScreenTabs = screen.getByTestId('tablet-above-tabs')

    const randomIndex = Math.floor(Math.random() * mockProps.tabs.length)
    const tab = mockProps.tabs[randomIndex]

    fireEvent.click(within(largerScreenTabs).getByText(tab.label))

    expect(screen.getByText(tab.content)).toBeInTheDocument()
  })

  test('JSX content renders', () => {
    const testId = 'test-id'
    const tab = {
      label: 'Tab 1',
      disabled: false,
      content: (
        <>
          <ul data-testid={testId}>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
        </>
      ),
    }

    render(<Tabs tabs={[tab]} />)

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })
})
