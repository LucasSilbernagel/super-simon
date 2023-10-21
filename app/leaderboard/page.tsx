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
  title: 'Super Simon | Leaderboard',
  description: 'The classic memory game Simon, with a twist!',
  url: 'https://super-simon-nmae08fvy-lucassilbernagel.vercel.app/',
  siteName: 'Super Simon',
  openGraph: {
    images: 'seoImage.png',
  },
  locale: 'en_US',
  type: 'website',
}
