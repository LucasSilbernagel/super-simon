import CommonWrapper from '../components/CommonWrapper'
import InstallationButton from '../components/InstallationButton/InstallationButton'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import LeaderboardBackLinks from '../components/LeaderboardBackLinks/LeaderboardBackLinks'

export default function NotFound() {
  return (
    <CommonWrapper>
      <InstallationButton />
      <div className="px-1">
        <Leaderboard />
      </div>
      <LeaderboardBackLinks />
    </CommonWrapper>
  )
}

export const metadata = {
  title: 'Super Simon | Leaderboard',
}
