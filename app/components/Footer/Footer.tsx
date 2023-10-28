'use client'
import { updateOnlineStatus } from '@/app/redux/features/onlineStatusSlice'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

const Footer = () => {
  const dispatch = useAppDispatch()
  const isOnline = useAppSelector((state) => state.onlineStatusReducer)

  useEffect(() => {
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
  }, [])

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="pb-4"
    >
      {isOnline.value ? (
        <p className="text-center">
          Built by{' '}
          <a
            href="https://lucassilbernagel.com/"
            target="_blank"
            rel="noreferrer"
            className="Link"
          >
            Lucas Silbernagel
          </a>
        </p>
      ) : (
        <p className="text-center">Built by Lucas Silbernagel</p>
      )}
    </motion.footer>
  )
}

export default Footer
