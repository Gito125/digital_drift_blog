'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const themes = [
  { id: 'light', label: 'Light', icon: '☀️' },
  { id: 'dark', label: 'Dark', icon: '🌙' },
  { id: 'system', label: 'System', icon: '🖥️' },
] as const;

export default function ThemeDemoClient() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-4xl font-heading font-bold text-foreground">
          Theme Playground
        </h1>
        <p className="text-foreground/70 max-w-xl">
          Switch between light, dark, or system themes and see how the UI adapts in real time.
        </p>
      </header>

      {/* Theme switcher */}
      <section className="p-6 rounded-2xl border border-border bg-background/80 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-foreground/70">
            Active theme:{' '}
            <span className="font-semibold text-foreground">
              {theme} {theme === 'system' && `(${resolvedTheme})`}
            </span>
          </p>

          <div className="flex gap-2">
            {themes.map(({ id, label, icon }) => {
              const active = theme === id;
              return (
                <button
                  key={id}
                  onClick={() => setTheme(id)}
                  aria-pressed={active}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                    transition-all duration-200
                    ${
                      active
                        ? 'bg-accent text-background shadow-md scale-[1.02]'
                        : 'bg-muted text-muted-foreground hover:bg-muted/70'
                    }
                  `}
                >
                  <span>{icon}</span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Preview cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-3">
            Primary Card
          </h2>
          <p className="text-foreground/80 mb-4">
            This card adapts its background, text, and borders based on the selected theme.
          </p>
          <button className="inline-flex items-center px-4 py-2 rounded-lg bg-accent text-white font-medium hover:opacity-90 transition">
            Action
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-3">
            Nested Surfaces
          </h2>
          <p className="text-foreground/80 mb-4">
            Nested components should still maintain contrast and hierarchy.
          </p>

          <div className="rounded-xl bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Muted surface using theme tokens
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
