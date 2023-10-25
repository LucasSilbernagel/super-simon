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
  metadataBase: new URL('https://super-simon-kappa.vercel.app'),
  title: 'Super Simon',
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
