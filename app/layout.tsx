import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';
import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'LTU HTML Generator',
  description: 'Generate HTML5 code for MOODLE LMS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
