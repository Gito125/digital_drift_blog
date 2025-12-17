import Link from 'next/link';

export const metadata = {
  title: 'Contact — Digital Drift',
  description: 'Get in touch with Digital Drift. Questions, feedback, or collaboration ideas.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          {/* Header */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full">
              <svg
                className="w-10 h-10 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-3-3v6"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-4">
            Contact Digital Drift
          </h1>
          <p className="text-foreground/70 text-center mb-10 max-w-lg mx-auto">
            Questions, feedback, or collaboration ideas? Reach out and we’ll get back to you.
          </p>

          {/* Contact options */}
          <div className="grid gap-4 mb-10">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-foreground/5 border border-foreground/10">
              <div className="text-accent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 4H8m8-8H8m13 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <p className="text-sm text-foreground/70">
                  iamgideon125@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-foreground/5 border border-foreground/10">
              <div className="text-accent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">Community</p>
                <p className="text-sm text-foreground/70">
                  Join discussions via blog comments and posts.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/blog"
              className="flex-1 px-6 py-3 bg-accent text-white rounded-xl hover:opacity-90 transition-all font-semibold shadow-lg text-center"
            >
              Browse Blog
            </Link>
            <Link
              href="/"
              className="flex-1 px-6 py-3 bg-background border-2 border-foreground/20 text-foreground rounded-xl hover:border-accent hover:bg-accent/5 transition-all font-semibold shadow-lg text-center"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
