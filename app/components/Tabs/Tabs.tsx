import React, { useState, useEffect, LegacyRef } from 'react'
import './Tabs.css'
import useCloseOnEscape from '@/app/hooks/useCloseOnEscape'
import useOutsideClick from '@/app/hooks/useOutsideClick'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

export const MOBILE_TAB_COUNT = 3

export interface ITabProps {
  /** Text within the tab button */
  label: string | JSX.Element
  /** Content of the tab */
  content: JSX.Element | string
}

export interface ITabArrayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of Tab Items */
  tabs: ITabProps[]
  /** Mobile dropdown is shown at tab count */
  mobileTabCount?: number
  /** Specify Default Tab */
  defaultTab?: number
}

const Tabs = ({
  tabs,
  mobileTabCount = MOBILE_TAB_COUNT,
  defaultTab = 0,
}: ITabArrayProps) => {
  const [activeTab, setActiveTab] = useState<number>(defaultTab)
  const [showMobileDropdown, toggleShowMobileDropdown] =
    useState<boolean>(false)

  useCloseOnEscape(showMobileDropdown, toggleShowMobileDropdown)

  /* Prevent default/active Tab from going out of range */
  useEffect(() => {
    const tabMax = tabs.length - 1
    const tabMin = 0
    if (defaultTab > tabMax || defaultTab < tabMin) {
      console.warn(
        `Default tab index ${defaultTab} is out of range. Defaulting to 0.`
      )
      setActiveTab(0)
    } else {
      setActiveTab(defaultTab)
    }
  }, [defaultTab, tabs.length])

  const ref = useOutsideClick(() => toggleShowMobileDropdown(false)) as
    | LegacyRef<HTMLUListElement>
    | undefined

  return (
    <>
      <div className="TabsWrapper">
        <nav aria-label="secondary" className="Tabs" data-testid="tabs">
          {/* Mobile View */}
          <div
            className="m-0 flex md:hidden"
            data-testid="mobile-tabs"
            role="tablist"
          >
            {tabs.slice(0, mobileTabCount).map((tab, index) => {
              return (
                <button
                  key={`tab-${tab.label}-${index}`}
                  role="tab"
                  aria-selected={activeTab === index}
                  className={`Tabs__button flex ${
                    activeTab === index ? 'Tabs__button--active' : ''
                  }`}
                  data-testid="tab-button-mobile"
                  onClick={() => {
                    setActiveTab(index)
                  }}
                  id={`tab-${index + 1}-mobile`}
                  type="button"
                >
                  {tab.label}
                </button>
              )
            })}
            {tabs.length > mobileTabCount && (
              <div className="flex relative">
                <button
                  role="tab"
                  onClick={() => toggleShowMobileDropdown(!showMobileDropdown)}
                  className="Tabs__dropdown-toggle"
                  aria-label="Toggle navigation dropdown"
                  aria-expanded={showMobileDropdown}
                  data-testid="tab-dropdown-toggle"
                  tabIndex={0}
                >
                  <BiDotsHorizontalRounded />
                </button>
                {showMobileDropdown && (
                  <ul className="Tabs__dropdown-menu" ref={ref}>
                    {tabs.slice(mobileTabCount).map((tab, index) => (
                      <li
                        key={`mobile-dropdown-tab-${index}`}
                        className="list-none"
                        role="tab"
                      >
                        <button
                          className={`Tabs__dropdown-button ${
                            activeTab === index + mobileTabCount
                              ? 'Tabs__dropdown-button--active'
                              : ''
                          }`}
                          data-testid="tab-mobile-dropdown-button"
                          onClick={() => {
                            setActiveTab(index + mobileTabCount)
                            toggleShowMobileDropdown(false)
                          }}
                          tabIndex={0}
                          id={`tab-dropdown-button-${
                            index + 1 + mobileTabCount
                          }`}
                          type="button"
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          {/* Tablet and larger screens */}
          <ul
            className="m-0 hidden md:flex"
            data-testid="tablet-above-tabs"
            role="tablist"
          >
            {tabs.map((tab, index) => {
              return (
                <button
                  key={`tab-${tab.label}-${index}`}
                  role="tab"
                  aria-selected={activeTab === index}
                  className={`Tabs__button flex ${
                    activeTab === index ? 'Tabs__button--active' : ''
                  }`}
                  data-testid="tab-button"
                  onClick={() => {
                    setActiveTab(index)
                  }}
                  id={`tab-desktop-${index + 1}`}
                  type="button"
                >
                  {tab.label}
                </button>
              )
            })}
          </ul>
        </nav>
      </div>
      <section
        className="TabContentWrapper"
        data-testid="tab-content-wrapper"
        role="tabpanel"
        tabIndex={0}
        id={`panel-${activeTab + 1}`}
        aria-labelledby={`tab-${activeTab + 1}`}
      >
        {tabs.map((tab, index) =>
          index === activeTab ? (
            <React.Fragment key={`tab-content-${index}`}>
              {tab.content}
            </React.Fragment>
          ) : null
        )}
      </section>
    </>
  )
}

export default Tabs
