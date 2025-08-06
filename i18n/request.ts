import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Default to 'en' if locale is undefined
  const currentLocale = locale || 'en';
  
  try {
    // Load all message files for the locale
    const [commonMessages, shopMessages] = await Promise.all([
      import(`../locales/${currentLocale}/common.json`),
      import(`../locales/${currentLocale}/shop.json`)
    ]);
    
    // Merge all messages into a single object with namespaces
    const messages = {
      common: commonMessages.default,
      shop: shopMessages.default
    };
    
    return {
      locale: currentLocale,
      messages
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${currentLocale}`, error);
    // Return fallback messages with proper structure
    return {
      locale: currentLocale,
      messages: {
        common: {
          navigation: {
            home: 'Home',
            shop: 'Shop',
            gallery: 'Gallery',
            music: 'Music'
          },
          messages: {},
          actions: {},
          labels: {},
          loading: {}
        },
        shop: {
          title: 'Shop',
          description: 'Discover unique artwork and exclusive pieces',
          product: {},
          cart: {},
          categories: {}
        }
      }
    };
  }
});