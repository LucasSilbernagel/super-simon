'use client'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="pb-4"
    >
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
    </motion.footer>
  )
}

export default Footer
