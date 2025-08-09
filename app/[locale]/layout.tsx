import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/styles/globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  const locales = ['en', 'es'];
  if (!locales.includes(locale)) {
    notFound();
  }

  // Get messages
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    console.error('Failed to load messages:', error);
    messages = {};
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen bg-black">
        {children}
      </div>
    </NextIntlClientProvider>
  );
}