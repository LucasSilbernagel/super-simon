'use client'

import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()

  const getHeader = () => {
    if (pathname === '/') {
      return (
        <>
          <h1 className="text-6xl mb-4">Super Simon</h1>
          <h2 className="text-2xl leading-relaxed">
            The classic memory game Simon, with a twist! <br /> How long of a
            sequence can you remember?
          </h2>
        </>
      )
    } else if (pathname === '/leaderboard') {
      return <h1 className="text-6xl mb-4">Leaderboard</h1>
    } else
      return (
        <h1 className="text-5xl text-center py-24">
          Sorry, that page couldn&apos;t be found!
        </h1>
      )
  }
  return <header className="text-center pt-12">{getHeader()}</header>
}

export default Header
