import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
  description:
    'Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.',
  metadataBase: new URL('https://puppywebsiteclone.vercel.app'),
  alternates: {
    canonical: 'https://puppywebsiteclone.vercel.app',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    description:
      'Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.',
    siteName: 'TeddyPups U.A.E.',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: 'https://puppywebsiteclone.vercel.app/brand/logo.png',
        width: 800,
        height: 800,
        alt: 'TeddyPups U.A.E.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    description:
      'Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.',
    images: ['https://puppywebsiteclone.vercel.app/brand/logo.png'],
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
        {/* Skip to Content Link matching original */}
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-cocoa px-5 py-3 font-semibold text-milk"
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

        {/* Sticky Mobile Bottom Bar matching original (7th WhatsApp link) */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-cocoa bg-milk px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden">
          <div className="mx-auto flex max-w-md gap-2">
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp !min-h-12 flex-1 !shadow-none"
            >
              WhatsApp us
            </a>
            <a
              href="tel:+971541676733"
              className="btn btn-ghost !min-h-12 !px-5"
            >
              Call
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
