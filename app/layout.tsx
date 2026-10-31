import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import CursorTrail from '@/components/CursorTrail';
import PageCurtain from '@/components/PageCurtain';
import { currentSite } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: `${currentSite.brandName} — Premium teacup puppies in ${currentSite.locationCity}`,
  description:
    'Teacup and teddy bear puppies available now in Dubai and imported from trusted breeders — every listing shows real photos of the puppy.',
  metadataBase: new URL('https://puppy.instabizweb.com'),
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fffdf8] text-[#2a170e]">
        <PageCurtain />
        <CursorTrail />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
