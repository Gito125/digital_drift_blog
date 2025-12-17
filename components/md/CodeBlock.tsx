'use client';

import React, { useState } from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  className?: string;
  [key: string]: any;
}

/**
 * Client Component for interactive code blocks
 * Handles copy functionality and visual feedback
 */
export function CodeBlock({ children, language = 'code', className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codeElement = document.querySelector(`[data-code-id="${language}"]`);
    const code = codeElement?.textContent || '';
    
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="group relative my-8">
      {/* Language badge */}
      <div className="absolute -top-3 left-4 z-10">
        <span 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold text-white shadow-lg backdrop-blur-sm"
          style={{
            background: "linear-gradient(to right, var(--color-accent-90), var(--color-accent-70))",
            boxShadow: "0 10px 15px -3px var(--color-accent-20)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          {language}
        </span>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg border transition-all duration-200 opacity-0 group-hover:opacity-100 z-10 hover:scale-110"
        style={{
          background: copied ? "rgba(34, 197, 94, 0.2)" : "var(--color-foreground-5)",
          borderColor: copied ? "rgb(74, 222, 128)" : "var(--color-foreground-10)",
          color: copied ? "rgb(74, 222, 128)" : "var(--color-foreground-60)"
        }}
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>

      <pre
        data-code-id={language}
        className={`relative rounded-2xl p-6 overflow-x-auto border shadow-xl backdrop-blur-sm ${className || ''}`}
        style={{
          background: "linear-gradient(135deg, var(--color-foreground-5), var(--color-foreground-5))",
          borderColor: "var(--color-foreground-10)",
          boxShadow: "0 25px 50px -12px var(--color-foreground-5)"
        }}
        {...props}
      >
        {/* Decorative corner accents */}
        <div 
          className="absolute top-0 left-0 w-20 h-20 rounded-tl-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, var(--color-accent-10), transparent)"
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-20 h-20 rounded-br-2xl pointer-events-none"
          style={{
            background: "linear-gradient(315deg, var(--color-accent-10), transparent)"
          }}
        />
        
        {/* Actual code content */}
        <div className="relative z-[1]">
          {children}
        </div>
      </pre>
    </div>
  );
}

interface InlineCodeProps {
  children: React.ReactNode;
}

/**
 * Inline code component (no interactivity needed)
 */
export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code
        className="relative inline-flex items-center gap-1 px-2 py-0.5 rounded-md border font-mono text-sm font-semibold shadow-sm"
        style={{
            color: "var(--code-fg)",
            background:
            "linear-gradient(to right, var(--color-accent-10), var(--color-accent-5))",
            borderColor: "var(--color-accent-20)",
        }}
        >
        {children}
    </code>
  );
}