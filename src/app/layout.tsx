import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ForgeFit Club - Transform Your Body, Forge Your Strength',
  description: 'Join the ultimate fitness community with expert guidance, proven programs, and personalized nutrition plans. Transform your body and unlock your full potential.',
  keywords: 'fitness, workout, strength training, nutrition, fitness community, personal training',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}