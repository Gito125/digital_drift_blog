import { Metadata } from 'next';
import SignupClient from './signup-client';

export const metadata: Metadata = {
  title: "Create an Account",
  description: "Join the Digital Drift community. Create an account to comment on posts, engage with other readers, and get the full experience.",
};

export default function SignupPage() {
  return <SignupClient />;
}
