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
      <footer>
        <p className="text-center">
          Built by{' '}
          <a
            href="https://lucassilbernagel.com/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:underline-offset-4 focus-visible:underline-offset-4 transition-all"
          >
            Lucas Silbernagel
          </a>
        </p>
      </footer>
    </RootLayout>
  )
}
