'use client';

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from '@/store/store';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}