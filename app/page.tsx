import Link from 'next/link'
import CommonWrapper from './components/CommonWrapper'
import Difficulty from './components/Difficulty/Difficulty'
import GameBoard from './components/GameBoard/GameBoard'

export default function Home() {
  return (
    <CommonWrapper>
      <Difficulty />
      <GameBoard />
      <div className="absolute top-2 right-2 sm:top-4 sm:right-8 sm:text-lg Link">
        <Link href="/leaderboard">Leaderboard</Link>
      </div>
    </CommonWrapper>
  )
}
