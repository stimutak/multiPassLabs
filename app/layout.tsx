import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MultiPass Labs - Experimental Collective',
  description: 'Terminal-driven experimental platform operated by mysterious lab entities. Audio-reactive visuals, generative art, and glitch aesthetics.',
  keywords: 'generative art, glitch art, audio reactive, experimental, TouchDesigner, Notch, Max/MSP, SuperCollider',
  authors: [{ name: 'MultiPass Labs Collective' }],
  creator: 'MultiPass Labs',
  publisher: 'MultiPass Labs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://multipass.labs'),
  openGraph: {
    title: 'MultiPass Labs',
    description: 'Experimental collective platform for audio-reactive visuals and generative art',
    url: 'https://multipass.labs',
    siteName: 'MultiPass Labs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MultiPass Labs',
    description: 'Experimental collective platform for audio-reactive visuals and generative art',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' }
    ]
  },
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}