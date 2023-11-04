'use client'
import { useAppSelector } from '@/app/redux/hooks'
import { motion } from 'framer-motion'

const Footer = () => {
  const isOnline = useAppSelector((state) => state.onlineStatusReducer)

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
