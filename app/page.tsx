import Link from 'next/link'
import CommonWrapper from './components/CommonWrapper'
import Difficulty from './components/Difficulty/Difficulty'
import GameBoard from './components/GameBoard/GameBoard'
import { orbitron } from './fonts'
import { FaArrowRight } from 'react-icons/fa'

export default function Home() {
  return (
    <CommonWrapper>
      <Difficulty />
      <GameBoard />
      <div
        className={`absolute top-4 right-4 sm:top-4 sm:right-8 sm:text-lg ${orbitron.className} tracking-widest`}
      >
        <Link href="/leaderboard" className="ArrowLink">
          <span>Leaderboard</span> <FaArrowRight className="ArrowRight" />
        </Link>
      </div>
    </CommonWrapper>
  )
}

export const metadata = {
  metadataBase: new URL('https://super-simon-kappa.vercel.app'),
  title: 'Super Simon',
  description: 'The classic memory game Simon, with a twist!',
  url: 'https://super-simon-kappa.vercel.app/',
  siteName: 'Super Simon',
  locale: 'en_US',
  type: 'website',
  openGraph: {
    images: [
      {
        url: 'seoImage.png',
      },
    ],
  },
}
