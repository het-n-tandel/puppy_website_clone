import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import CursorTrail from '@/components/CursorTrail';
import PageCurtain from '@/components/PageCurtain';
import { currentSite } from '@/lib/siteConfig';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#fffdf8',
};

export const metadata: Metadata = {
  title: `${currentSite.brandName} — Premium teacup puppies in ${currentSite.locationCity}`,
  description:
    'Teacup and teddy bear puppies available now in Dubai and imported from trusted breeders — every listing shows real photos of the puppy.',
  metadataBase: new URL('https://puppywebsiteclone.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: `${currentSite.brandName} — Premium teacup puppies in ${currentSite.locationCity}`,
    description:
      'Teacup and teddy bear puppies available now in Dubai and imported from trusted breeders — every listing shows real photos of the puppy.',
    siteName: currentSite.brandName,
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/brand/logo.png',
        width: 800,
        height: 800,
        alt: currentSite.brandName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${currentSite.brandName} — Premium teacup puppies in ${currentSite.locationCity}`,
    description:
      'Teacup and teddy bear puppies available now in Dubai and imported from trusted breeders — every listing shows real photos of the puppy.',
    images: ['/brand/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1&family=Shantell+Sans:ital,wght,BNCE,INFM,SPAC@0,300..800,-100..100,0..100,0..100;1,300..800,-100..100,0..100,0..100&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fffdf8] text-[#2a170e]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#2a170e] focus:text-[#fffdf8] focus:rounded-full focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>
        <PageCurtain />
        <CursorTrail />
        <Navbar />
        <main id="main" tabIndex={-1} className="relative flex-1 outline-none pt-[var(--header-h)]">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
