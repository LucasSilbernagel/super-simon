import { useEffect } from 'react'

/** If a new version of the app is available, prompt the user to update. */
const useCheckForUpdate = () => {
  useEffect(() => {
    if (
      window.location.hostname !== 'localhost' &&
      'serviceWorker' in navigator
    ) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.onstatechange = () => {
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content is available, notify the user.
                  promptUserForUpdate()
                }
              }
            }
          }
        })
      })
    }
    const promptUserForUpdate = () => {
      const shouldUpdate = window.confirm(
        'A new version is available. Would you like to update?'
      )
      if (shouldUpdate) {
        window.location.reload()
      }
    }
  }, [])
}

export default useCheckForUpdate
