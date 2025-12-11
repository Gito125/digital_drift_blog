import type { Metadata } from "next";
import localFont from 'next/font/local';
import { getServerSession } from "next-auth/next";
import Providers from './providers';
import { authOptions } from "@/auth";
import "./globals.css";

import {
  Poppins,
  Inter,
  Work_Sans,
  Playfair_Display,
  Raleway,
} from 'next/font/google';

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
  variable: '--font-remisa',
  display: 'swap',
});

export const emilio = Raleway({
  weight: ['100'],        // Thin Italic replacement
  style: ['italic'],
  subsets: ['latin'],
  variable: '--font-emilio',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Digital Drift - Exploring the Digital Frontier",
  description: "A Next.js 16 blog platform exploring the digital frontier.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${azurio.variable} ${goga.variable} ${remi.variable} ${remisa.variable} ${emilio.variable} font-body antialiased`}
      >
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
