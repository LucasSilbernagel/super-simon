import Link from 'next/link'
import CommonWrapper from './components/CommonWrapper'
import { FaArrowLeft } from 'react-icons/fa'
import { Metadata } from 'next'

export default function NotFound() {
  return (
    <CommonWrapper>
      <div className="mb-36">
        <div className="w-full flex justify-center text-2xl pb-24">
          <Link href="/" className="text-xl flex Link">
            <FaArrowLeft /> <span className="mx-2">Return home</span>{' '}
          </Link>
        </div>
      </div>
    </CommonWrapper>
  )
}

export const metadata: Metadata = {
  title: 'Super Simon | 404',
  description: 'The classic memory game Simon, with a twist!',
}
