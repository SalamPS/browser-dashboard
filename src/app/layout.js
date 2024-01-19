import { Exo_2 } from 'next/font/google'
import './index.css'

const font = Exo_2({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard',
  description: 'LamP',
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
