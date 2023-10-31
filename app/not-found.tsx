import Link from 'next/link'
import CommonWrapper from './components/CommonWrapper'
import { FaArrowLeft } from 'react-icons/fa'
import InstallationButton from './components/InstallationButton/InstallationButton'

export default function NotFound() {
  return (
    <CommonWrapper>
      <InstallationButton />
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
  title: 'Super Simon | 404',
}
