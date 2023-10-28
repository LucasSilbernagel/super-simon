import CommonWrapper from './components/CommonWrapper'
import Difficulty from './components/Difficulty/Difficulty'
import GameBoard from './components/GameBoard/GameBoard'
import LeaderboardLink from './components/LeaderboardLink/LeaderboardLink'

export default function Home() {
  return (
    <CommonWrapper>
      <Difficulty />
      <GameBoard />
      <LeaderboardLink />
    </CommonWrapper>
  )
}

export const metadata = {
  title: 'Super Simon',
}
