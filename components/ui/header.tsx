'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleMobileMenu } from '@/store/slices/uiSlice';
import { Button } from './button';

export function Header() {
  const t = useTranslations('common');
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const { items } = useAppSelector((state) => state.cart);

  const handleMobileMenuToggle = () => {
    dispatch(toggleMobileMenu());
  };

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">MultiPass Labs</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/blog" className="text-foreground/60 hover:text-foreground transition-colors">
            {t('navigation.blog')}
          </Link>
          <Link href="/shop" className="text-foreground/60 hover:text-foreground transition-colors">
            {t('navigation.shop')}
          </Link>
          <Link href="/gallery" className="text-foreground/60 hover:text-foreground transition-colors">
            {t('navigation.gallery')}
          </Link>
          <Link href="/music" className="text-foreground/60 hover:text-foreground transition-colors">
            {t('navigation.music')}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative">
            <span className="sr-only">{t('actions.viewCart')}</span>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs font-medium text-primary-foreground flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={handleMobileMenuToggle}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-4 space-y-2">
            <Link
              href="/blog"
              className="block px-4 py-2 text-foreground/60 hover:text-foreground transition-colors"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              {t('navigation.blog')}
            </Link>
            <Link
              href="/shop"
              className="block px-4 py-2 text-foreground/60 hover:text-foreground transition-colors"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              {t('navigation.shop')}
            </Link>
            <Link
              href="/gallery"
              className="block px-4 py-2 text-foreground/60 hover:text-foreground transition-colors"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              {t('navigation.gallery')}
            </Link>
            <Link
              href="/music"
              className="block px-4 py-2 text-foreground/60 hover:text-foreground transition-colors"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              {t('navigation.music')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}