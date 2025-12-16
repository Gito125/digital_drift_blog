import { Metadata } from 'next';
import LoginClient from './login-client';

export const metadata: Metadata = {
  title: "Sign In to Digital Drift",
  description: "Access your Digital Drift account. Sign in to join the conversation, manage your profile, and engage with our community.",
};

export default function LoginPage() {
  return <LoginClient />;
}
