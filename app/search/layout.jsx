import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HySaid - Search'
}

export default function RootLayout({ children }) {
  return <section>{children}</section>;
}
