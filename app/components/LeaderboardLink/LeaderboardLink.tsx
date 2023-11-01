'use client'
import { orbitron } from '@/app/fonts'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useAppSelector } from '@/app/redux/hooks'

const LeaderboardLink = () => {
  const isOnline = useAppSelector((state) => state.onlineStatusReducer)

  if (isOnline.value) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`absolute top-4 right-4 sm:top-4 sm:right-8 sm:text-lg ${orbitron.className} tracking-widest`}
      >
        <Link href="/leaderboard" className="ArrowLink">
          <span>Leaderboard</span> <FaArrowRight className="ArrowRight" />
        </Link>
      </motion.div>
    )
  } else return null
}

export default LeaderboardLink
