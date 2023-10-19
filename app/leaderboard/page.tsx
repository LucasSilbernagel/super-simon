import Link from 'next/link'
import CommonWrapper from '../components/CommonWrapper'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import { FaArrowLeft } from 'react-icons/fa'
import { orbitron } from '../fonts'
import { Metadata } from 'next'

export default function NotFound() {
  return (
    <CommonWrapper>
      <Leaderboard />
      <div className="w-full flex justify-center text-2xl pb-24">
        <Link href="/" className="text-xl flex Link">
          <FaArrowLeft />{' '}
          <span className={`mx-2 ${orbitron.className} tracking-widest`}>
            Play again
          </span>{' '}
        </Link>
      </div>
    </CommonWrapper>
  )
}

export const metadata: Metadata = {
  title: 'Super Simon | Leaderboard',
  description: 'The classic memory game Simon, with a twist!',
}
