import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link 
        href="/"
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Go Home
      </Link>
    </div>
  );
}

