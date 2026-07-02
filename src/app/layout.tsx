import type { Metadata } from 'next';
import './globals.css';

export const viewport = {
  themeColor: '#f1eee7',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Nguyen Tuan Anh - Software Engineer',
  description:
    'Software Engineer and Java Backend Developer building enterprise APIs, microservices, integrations, and production-ready systems.',
  keywords: [
    'Nguyen Tuan Anh',
    'Java Backend Developer',
    'Software Engineer',
    'Spring Boot',
    'Microservices',
    'PostgreSQL',
    'Ho Chi Minh City',
  ],
  authors: [{ name: 'Nguyen Tuan Anh' }],
  creator: 'Nguyen Tuan Anh',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Nguyen Tuan Anh - Software Engineer',
    description:
      'Java Backend Developer focused on enterprise APIs, microservices, integrations, and production stability.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/portrait-nguyen-tuan-anh.png',
        width: 1254,
        height: 1254,
        alt: 'Nguyen Tuan Anh portrait',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nguyen Tuan Anh - Software Engineer',
    description:
      'Java Backend Developer focused on enterprise APIs, microservices, integrations, and production stability.',
    images: ['/portrait-nguyen-tuan-anh.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
