import Link from 'next/link'
import CommonWrapper from './components/CommonWrapper'
import { FaArrowLeft } from 'react-icons/fa'

export default function NotFound() {
  return (
    <CommonWrapper>
      <div className="mb-36">
        <div className="w-full flex justify-center text-2xl pb-24">
          <Link href="/" className="ArrowLink text-xl">
            <FaArrowLeft className="ArrowLeft" /> <span>Return home</span>{' '}
          </Link>
        </div>
      </div>
    </CommonWrapper>
  )
}

export const metadata = {
  metadataBase: new URL('https://super-simon-kappa.vercel.app'),
  title: 'Super Simon | 404',
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
