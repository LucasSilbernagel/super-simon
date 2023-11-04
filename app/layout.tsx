import './globals.css'
import { Providers } from './redux/provider'
import { inter } from './fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const viewport = {
  themeColor: '#1F2937',
}

export const metadata = {
  metadataBase: new URL('https://super-simon-kappa.vercel.app'),
  applicationName: 'Super Simon',
  description: 'The classic memory game Simon, with a twist!',
  url: 'https://super-simon-kappa.vercel.app/',
  openGraph: {
    images: [
      {
        url: 'seoImage.png',
      },
    ],
  },
  manifest: 'manifest.json',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: 'favicon-32x32.png',
    apple: 'apple-touch-icon.png',
    shortcut: 'favicon.ico',
  },
  appleWebApp: {
    title: 'Super Simon',
    statusBarStyle: 'default',
    startupImage: [
      {
        url: 'splashscreens/iphone5_splash.png',
        media: '(device-width: 320px) and (device-height: 568px)',
      },
      {
        url: 'splashscreens/iphone6_splash.png',
        media: '(device-width: 375px) and (device-height: 667px)',
      },
      {
        url: 'splashscreens/iphoneplus_splash.png',
        media: '(device-width: 621px) and (device-height: 1104px)',
      },
      {
        url: 'splashscreens/iphonex_splash.png',
        media: '(device-width: 375px) and (device-height: 812px)',
      },
      {
        url: 'splashscreens/iphonexr_splash.png',
        media: '(device-width: 414px) and (device-height: 896px)',
      },
      {
        url: 'splashscreens/iphonexsmax_splash.png',
        media: '(device-width: 414px) and (device-height: 896px)',
      },
      {
        url: 'splashscreens/ipad_splash.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
      {
        url: 'splashscreens/ipadpro1_splash.png',
        media: '(device-width: 834px) and (device-height: 1112px)',
      },
      {
        url: 'splashscreens/ipadpro3_splash.png',
        media: '(device-width: 834px) and (device-height: 1194px)',
      },
      {
        url: 'splashscreens/ipadpro2_splash.png',
        media: '(device-width: 1024px) and (device-height: 1366px)',
      },
    ],
  },
}
