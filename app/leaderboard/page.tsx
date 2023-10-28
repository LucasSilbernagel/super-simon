import CommonWrapper from '../components/CommonWrapper'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import LeaderboardBackLinks from '../components/LeaderboardBackLinks/LeaderboardBackLinks'

export default function NotFound() {
  return (
    <CommonWrapper>
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
