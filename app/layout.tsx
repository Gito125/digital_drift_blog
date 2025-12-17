import { getServerSession } from "next-auth/next";
import Providers from './providers';
import { authOptions } from "@/auth";
import Header from '@/components/Header';
import "./styles/globals.css";

// Metadata
import { Metadata } from 'next';
import seoData from '@/config/seo-metadata.json';

export const metadata: Metadata = {
  title: seoData.metadata.pages['/'].title,
  description: seoData.metadata.pages['/'].description,
  keywords: seoData.metadata.pages['/'].keywords,
  openGraph: {
    title: seoData.metadata.pages['/'].ogTitle,
    description: seoData.metadata.pages['/'].ogDescription,
  },
  alternates: {
    canonical: seoData.metadata.pages['/'].canonical
  }
};

import {
  Poppins,
  Inter,
  Work_Sans,
  Playfair_Display,
  Raleway,
} from 'next/font/google';
import FooterSection from "@/components/main/FooterSection";

export const azurio = Poppins({
  weight: ['800'],        // ExtraBold replacement
  subsets: ['latin'],
  variable: '--font-azurio',
  display: 'swap',
});

export const goga = Inter({
  weight: ['400'],        // Regular replacement
  subsets: ['latin'],
  variable: '--font-goga',
  display: 'swap',
});

export const remi = Work_Sans({
  weight: ['400', '600'], // Body + Subhead replacement
  subsets: ['latin'],
  variable: '--font-remi',
  display: 'swap',
});

export const remisa = Playfair_Display({
  weight: ['400', '600'], // Elegant serif replacement
  subsets: ['latin'],
  variable: '--font-remi',
  display: 'swap',
});

export const emilio = Raleway({
  weight: ['100'],        // Thin Italic replacement
  style: ['italic'],
  subsets: ['latin'],
  variable: '--font-emilio',
  display: 'swap',
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${azurio.variable} ${goga.variable} ${remi.variable} ${remisa.variable} ${emilio.variable} font-body antialiased bg-background text-text`}
      >
        <Providers session={session}>
          <Header />
          <main>
            {children}
          </main>
        </Providers>

        {/* Footer Section */}
        <FooterSection />
      </body>
    </html>
  );
}
