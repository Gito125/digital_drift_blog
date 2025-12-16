import { Metadata } from 'next';
import ThemeDemoClient from './theme-demo-client';

export const metadata: Metadata = {
  title: "Theme Demo",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThemeDemoPage() {
  return <ThemeDemoClient />;
}
