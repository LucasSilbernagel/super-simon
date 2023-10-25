import CommonWrapper from './components/CommonWrapper'
import Difficulty from './components/Difficulty/Difficulty'
import LeaderboardLink from './components/LeaderboardLink/LeaderboardLink'
import dynamic from 'next/dynamic'

const DynamicGameBoard = dynamic(
  () => import('./components/GameBoard/GameBoard'),
  {
    ssr: false,
  }
)

export default function Home() {
  return (
    <CommonWrapper>
      <Difficulty />
      <DynamicGameBoard />
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
