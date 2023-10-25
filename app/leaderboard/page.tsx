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
  metadataBase: new URL('https://super-simon-kappa.vercel.app'),
  title: 'Super Simon | Leaderboard',
  description: 'The classic memory game Simon, with a twist!',
  url: 'https://super-simon-kappa.vercel.app/',
  openGraph: {
    images: [
      {
        url: 'seoImage.png',
      },
    ],
  },
}
