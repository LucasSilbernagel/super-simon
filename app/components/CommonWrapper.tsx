import RootLayout from '../layout'
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
      <footer className="pb-4">
        <p className="text-center">
          Built by{' '}
          <a
            href="https://lucassilbernagel.com/"
            target="_blank"
            rel="noreferrer"
            className="Link"
          >
            Lucas Silbernagel
          </a>
        </p>
      </footer>
    </RootLayout>
  )
}
