import Link from 'next/link'
import CommonWrapper from '../components/CommonWrapper'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import { FaArrowLeft } from 'react-icons/fa'
import { orbitron } from '../fonts'

export default function NotFound() {
  return (
    <CommonWrapper>
      <div className="px-1">
        <Leaderboard />
      </div>
      <div
        className={`absolute top-4 left-4 sm:top-4 sm:left-8 sm:text-lg ${orbitron.className} tracking-widest`}
      >
        <Link href="/" className="ArrowLink">
          <FaArrowLeft className="ArrowLeft" /> <span>Back</span>
        </Link>
      </div>
      <div className="w-full flex justify-center text-2xl pb-24">
        <Link href="/" className="ArrowLink text-xl">
          <FaArrowLeft className="ArrowLeft" />{' '}
          <span className={`mx-2 ${orbitron.className} tracking-widest`}>
            Play again
          </span>{' '}
        </Link>
      </div>
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
