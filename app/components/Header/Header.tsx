'use client'

import { orbitron } from '@/app/fonts'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import useCheckForUpdate from '@/app/hooks/useCheckForUpdate'

const Header = () => {
  useCheckForUpdate()
  const pathname = usePathname()

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
