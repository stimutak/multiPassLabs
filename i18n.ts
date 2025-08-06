import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'es'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  try {
    const common = (await import(`./locales/${locale}/common.json`)).default;
    const shop = (await import(`./locales/${locale}/shop.json`)).default;
    
    return {
      messages: {
        ...common,
        ...shop,
      }
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }
});