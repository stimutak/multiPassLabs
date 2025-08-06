import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { Providers } from '@/components/providers';
import { Header } from '@/components/ui/header';
import { ClientLayout } from '@/components/client-layout';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MultiPass Labs - Art & Music Platform',
  description: 'Immersive international art platform with real-time visuals and audio-reactive content',
};

const locales = ['en', 'es'];

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ClientLayout>
              <Header />
              {children}
            </ClientLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}