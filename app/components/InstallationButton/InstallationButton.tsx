'use client'
import {
  IBeforeInstallPromptEvent,
  updateInstallationPrompt,
} from '@/app/redux/features/installationPromptSlice'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

const InstallationButton = () => {
  const installationPrompt = useAppSelector(
    (state) => state.installationPromptReducer
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: IBeforeInstallPromptEvent) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      dispatch(updateInstallationPrompt({ value: e }))
    }
    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt as EventListenerOrEventListenerObject
    )
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt as EventListenerOrEventListenerObject
      )
    }
  }, [])

  const handleInstall = async () => {
    if (!installationPrompt.value) return
    await installationPrompt.value.prompt()
    dispatch(updateInstallationPrompt({ value: null }))
  }

  return (
    <div>
      {installationPrompt.value && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-20 flex gap-4 items-center">
          <button onClick={handleInstall} className="Button w-[197px]">
            Install Super Simon
          </button>
          <button
            onClick={() => dispatch(updateInstallationPrompt({ value: null }))}
            className="Button max-h-min"
            aria-label="Do not install Super Simon on my device"
          >
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  )
}

export default InstallationButton
