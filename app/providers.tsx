"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * A comprehensive provider component that wraps the application with all necessary context providers.
 * It includes SessionProvider for authentication and ThemeProvider for theme management.
 * @param {React.PropsWithChildren<{ session: any }>} { children, session }
 */
export default function Providers({ children, session }: { children: React.ReactNode, session?: any }) {
  return (
    <SessionProvider session={session}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </NextThemesProvider>
    </SessionProvider>
  );
}