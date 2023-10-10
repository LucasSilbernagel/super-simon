import Link from 'next/link'
import CommonWrapper from '../components/CommonWrapper'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import { FaArrowLeft } from 'react-icons/fa'

export default function NotFound() {
  return (
    <CommonWrapper>
      <Leaderboard />
      <div className="w-full flex justify-center text-2xl pb-24">
        <Link href="/" className="text-xl flex Link">
          <FaArrowLeft /> <span className="mx-2">Play again</span>{' '}
        </Link>
      </div>
    </CommonWrapper>
  )
}
