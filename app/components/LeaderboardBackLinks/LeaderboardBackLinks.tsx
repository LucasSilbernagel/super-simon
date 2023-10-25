'use client'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import { orbitron } from '@/app/fonts'
import { motion } from 'framer-motion'

export default function LeaderboardBackLinks() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div
        className={`absolute top-4 left-4 sm:top-4 sm:left-8 sm:text-lg ${orbitron.className} tracking-widest`}
      >
        <Link href="/" className="ArrowLink">
          <FaArrowLeft className="ArrowLeft" /> <span>Back</span>
        </Link>
      </div>
      <div className="w-full flex justify-center text-2xl pb-24">
        <Link href="/" className="ArrowLink text-xl">
          <FaArrowLeft className="ArrowLeft" />{' '}
          <span className={`mx-2 ${orbitron.className} tracking-widest`}>
            Play again
          </span>{' '}
        </Link>
      </div>
    </motion.div>
  )
}
