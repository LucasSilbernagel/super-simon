'use client'

import { useEffect } from 'react'
import { orbitron } from '@/app/fonts'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAppDispatch } from '@/app/redux/hooks'
import { updateOnlineStatus } from '@/app/redux/features/onlineStatusSlice'

const Header = () => {
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  useEffect(() => {
    /** If a new version of the app is available, prompt the user to update. */
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

  /** Update state when the user's device connects to or disconnects from the internet */
  useEffect(() => {
    dispatch(updateOnlineStatus({ value: navigator.onLine }))
    const handleOnline = () => {
      dispatch(updateOnlineStatus({ value: true }))
    }
    const handleOffline = () => {
      dispatch(updateOnlineStatus({ value: false }))
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [dispatch])

  const getHeader = () => {
    if (pathname === '/') {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1
            className={`text-4xl sm:text-6xl my-4 ${orbitron.className} tracking-wide`}
          >
            Super Simon
          </h1>
          <h2 className="text-xl sm:text-2xl leading-relaxed mt-8 px-2 sm:px-0">
            The classic memory game Simon, with a twist! <br /> How long of a
            sequence can you remember?
          </h2>
        </motion.div>
      )
    } else if (pathname === '/leaderboard') {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1
            className={`text-4xl sm:text-6xl my-4 ${orbitron.className} tracking-wide`}
          >
            Leaderboard
          </h1>
        </motion.div>
      )
    } else
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1
            className={`text-4xl sm:text-5xl text-center py-24 ${orbitron.className} tracking-wide`}
          >
            Sorry, that page couldn&apos;t be found!
          </h1>
        </motion.div>
      )
  }
  return <header className="text-center pt-12">{getHeader()}</header>
}

export default Header
