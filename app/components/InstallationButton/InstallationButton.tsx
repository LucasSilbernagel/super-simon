'use client'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion'

export interface IBeforeInstallPromptEvent extends Event {
  prompt(): unknown
  showPrompt: () => void
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const InstallationButton = () => {
  const [installationPrompt, setInstallationPrompt] =
    useState<IBeforeInstallPromptEvent | null>(null)
  const [isButtonLoaded, setIsButtonLoaded] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: IBeforeInstallPromptEvent) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setInstallationPrompt(e)
    }
    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt as EventListenerOrEventListenerObject
    )
    const timer = setTimeout(() => {
      setIsButtonLoaded(true)
    }, 3000)
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt as EventListenerOrEventListenerObject
      )
      clearTimeout(timer)
    }
  }, [])

  const handleInstall = async () => {
    if (!installationPrompt) return
    await installationPrompt.prompt()
    setInstallationPrompt(null)
  }

  if (isButtonLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        data-testid="installation-button"
      >
        {installationPrompt &&
          !sessionStorage.getItem('hideInstallationPrompt') && (
            <div className="fixed top-2 left-1/2 -translate-x-1/2 z-20 flex gap-4 items-center">
              <button onClick={handleInstall} className="Button w-[197px]">
                Install Super Simon
              </button>
              <button
                onClick={() => {
                  setInstallationPrompt(null)
                  sessionStorage.setItem('hideInstallationPrompt', 'true')
                }}
                className="Button max-h-min"
                aria-label="Do not install Super Simon on my device"
              >
                <FaTimes />
              </button>
            </div>
          )}
      </motion.div>
    )
  } else return null
}

export default InstallationButton
