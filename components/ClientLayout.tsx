'use client';

import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

