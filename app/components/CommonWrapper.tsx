import RootLayout from '../layout'
import Footer from './Footer/Footer'
import Header from './Header/Header'

export default function CommonWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootLayout>
      <Header />
      <main>{children}</main>
      <Footer />
    </RootLayout>
  )
}
