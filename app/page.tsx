import CommonWrapper from './components/CommonWrapper'
import Difficulty from './components/Difficulty/Difficulty'
import GameBoard from './components/GameBoard/GameBoard'
import InstallationButton from './components/InstallationButton/InstallationButton'
import LeaderboardLink from './components/LeaderboardLink/LeaderboardLink'
import MuteButton from './components/MuteButton/MuteButton'

export default function Home() {
  return (
    <CommonWrapper>
      <InstallationButton />
      <Difficulty />
      <GameBoard />
      <MuteButton />
      <LeaderboardLink />
    </CommonWrapper>
  )
}

export const metadata = {
  title: 'Super Simon',
}
