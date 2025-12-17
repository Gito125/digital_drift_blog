// components/md/Markdown.tsx
import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeReact from "rehype-react";
import * as prod from "react/jsx-runtime";
import { CodeBlock, InlineCode } from "./CodeBlock";

/**
 * Async Server Component Markdown Renderer
 * 
 * Uses Client Component (CodeBlock) for interactive features
 * Fixed: Code blocks now preserve line breaks
 * Fixed: Single # anchor on hover (removed duplicate)
 */
export default async function Markdown({ content }: { content: string }) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug) // Generates IDs for headings
    .use(rehypePrettyCode, {
      theme: {
        light: "github-light",
        dark: "github-dark-dimmed",
      },
      keepBackground: false,
      defaultLang: "plaintext",
      onVisitLine(node: any) {
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
      },
      onVisitHighlightedLine(node: any) {
        node.properties.className = ["line--highlighted"];
      },
      onVisitHighlightedChars(node: any) {
        node.properties.className = ["word--highlighted"];
      },
    })
    .use(rehypeReact, {
      // @ts-expect-error: React types mismatch
      ...prod,
      components: {
        // ENHANCED PRE/CODE BLOCKS (using Client Component)
        pre: ({ children, ...props }: any) => {
          const language = props["data-language"] || "code";
          return (
            <CodeBlock language={language} {...props}>
              {children}
            </CodeBlock>
          );
        },
        
        code: ({ children, className, ...props }: any) => {
          const isInline = !className;
          
          if (isInline) {
            return <InlineCode>{children}</InlineCode>;
          }
          
          // Block code - preserve whitespace and line breaks
          return (
            <code 
              className={`${className || ""} block font-mono text-sm leading-relaxed`}
              style={{ whiteSpace: "pre", display: "block" }}
              {...props}
            >
              {children}
            </code>
          );
        },

        // ENHANCED HEADINGS
        h1: (props: any) => (
          <h1 className="relative text-4xl font-heading font-bold mt-12 mb-6 scroll-mt-20 group">
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, var(--color-foreground), var(--color-foreground-70))"
              }}
            >
              {props.children}
            </span>
            <div 
              className="absolute -bottom-2 left-0 w-20 h-1 rounded-full"
              style={{
                background: "linear-gradient(to right, var(--color-accent), var(--color-accent-30))"
              }}
            />
            {props.id && (
              <a 
                href={`#${props.id}`} 
                className="anchor-link ml-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--color-accent-40)" }}
                aria-label="Link to this section"
              >
                #
              </a>
            )}
          </h1>
        ),
        
        h2: (props: any) => (
          <h2 className="relative text-3xl font-heading font-bold mt-10 mb-5 scroll-mt-20 group">
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, var(--color-foreground), var(--color-foreground-80))"
              }}
            >
              {props.children}
            </span>
            <div 
              className="absolute -bottom-1.5 left-0 w-16 h-0.5 rounded-full"
              style={{
                background: "linear-gradient(to right, var(--color-accent), var(--color-accent-30))"
              }}
            />
            {props.id && (
              <a 
                href={`#${props.id}`} 
                className="anchor-link ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--color-accent-40)" }}
                aria-label="Link to this section"
              >
                #
              </a>
            )}
          </h2>
        ),
        
        h3: (props: any) => (
          <h3 
            className="relative text-2xl font-heading font-semibold mt-8 mb-4 scroll-mt-20 group"
            style={{ color: "var(--color-foreground-90)" }}
          >
            {props.children}
            {props.id && (
              <a 
                href={`#${props.id}`} 
                className="anchor-link ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--color-accent-40)" }}
                aria-label="Link to this section"
              >
                #
              </a>
            )}
          </h3>
        ),
        
        h4: (props: any) => (
          <h4 
            className="text-xl font-heading font-semibold mt-6 mb-3 scroll-mt-20 group"
            style={{ color: "var(--color-foreground-90)" }}
          >
            {props.children}
            {props.id && (
              <a 
                href={`#${props.id}`} 
                className="anchor-link ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--color-accent-40)" }}
                aria-label="Link to this section"
              >
                #
              </a>
            )}
          </h4>
        ),

        // ENHANCED TYPOGRAPHY
        p: (props: any) => (
          <p 
            className="text-lg leading-relaxed mb-6" 
            style={{ color: "var(--color-foreground-80)" }}
            {...props} 
          />
        ),
        
        a: (props: any) => (
          <a 
            className="relative text-accent hover:opacity-80 font-medium break-words inline-block transition-all" 
            style={{
              textDecoration: "none",
            }}
            {...props} 
          />
        ),
        
        blockquote: (props: any) => (
          <blockquote
            className="relative border-l-4 border-accent pl-6 pr-4 py-4 my-8 rounded-r-lg italic"
            style={{
              background: "linear-gradient(to right, var(--color-accent-5), transparent)",
              color: "var(--color-foreground-70)"
            }}
            {...props}
          >
            <svg 
              className="absolute top-4 left-2 w-6 h-6" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: "var(--color-accent-20)" }}
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            {props.children}
          </blockquote>
        ),

        // ENHANCED LISTS
        ul: (props: any) => (
          <ul className="space-y-3 mb-6 ml-6" {...props} />
        ),
        
        ol: (props: any) => (
          <ol className="space-y-3 mb-6 ml-6" {...props} />
        ),
        
        li: (props: any) => (
          <li 
            className="relative leading-relaxed pl-2"
            style={{ color: "var(--color-foreground-80)" }}
          >
            <span 
              className="absolute -left-6 top-1.5 w-2 h-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-50))"
              }}
            />
            {props.children}
          </li>
        ),

        // ENHANCED MEDIA
        img: (props: any) => (
          <figure className="my-8">
            <img 
              className="rounded-2xl shadow-2xl border w-full h-auto transition-transform duration-300 hover:scale-[1.02]" 
              style={{
                borderColor: "var(--color-foreground-10)",
                boxShadow: "0 25px 50px -12px var(--color-foreground-10)"
              }}
              {...props} 
            />
            {props.alt && (
              <figcaption 
                className="text-center text-sm mt-3 italic"
                style={{ color: "var(--color-foreground-60)" }}
              >
                {props.alt}
              </figcaption>
            )}
          </figure>
        ),
        
        hr: (props: any) => (
          <div className="relative my-12">
            <hr 
              className="border-0 h-px"
              style={{
                background: "linear-gradient(to right, transparent, var(--color-foreground-20), transparent)"
              }}
              {...props} 
            />
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ background: "var(--color-accent-50)" }}
            />
          </div>
        ),

        // ENHANCED TABLES
        table: (props: any) => (
          <div 
            className="overflow-x-auto my-8 rounded-xl border shadow-xl"
            style={{ borderColor: "var(--color-foreground-10)" }}
          >
            <table 
              className="min-w-full"
              style={{ 
                borderCollapse: "separate",
                borderSpacing: 0
              }}
              {...props} 
            />
          </div>
        ),
        
        thead: (props: any) => (
          <thead 
            style={{
              background: "linear-gradient(to right, var(--color-accent-10), var(--color-accent-5))"
            }}
            {...props} 
          />
        ),
        
        th: (props: any) => (
          <th 
            className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider" 
            {...props} 
          />
        ),
        
        td: (props: any) => (
          <td 
            className="px-6 py-4 border-t" 
            style={{ 
              color: "var(--color-foreground-80)",
              borderColor: "var(--color-foreground-5)"
            }}
            {...props} 
          />
        ),
        
        tbody: (props: any) => (
          <tbody className="bg-background" {...props} />
        ),
      },
    })
    .process(content);

  return <>{file.result}</>;
}