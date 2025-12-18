/**
 * Enhanced Skeleton Components with Shimmer Effects
 * Production-grade loading states with sophisticated animations
 * 
 * REQUIRED: Import skeletonStyles.css in your app
 * import './skeletonStyles.css';
 */

/**
 * Base Shimmer Animation Wrapper
 * Creates the core shimmer effect used across all skeletons
 */
function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

/**
 * Enhanced Blog List Skeleton
 * Features: Staggered animations, shimmer effects, realistic content blocks
 */
export function BlogListSkeleton() {
  return (
    <>
      <div className="grid gap-8 max-w-4xl mx-auto">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="group relative p-6 bg-gray-400/30 backdrop-blur-md border border-foreground/10 rounded-xl overflow-hidden"
            style={{ 
              animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`,
            }}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/8 to-transparent" />
            
            {/* Content skeleton */}
            <div className="relative space-y-3">
              {/* Title lines with varying widths */}
              <div className="space-y-2">
                <div className="h-2 bg-foreground/20 rounded-lg w-full animate-pulse" 
                     style={{ animationDelay: `${index * 0.1}s` }} />
                <div className="h-2 bg-foreground/20 rounded-lg w-3/4 animate-pulse" 
                     style={{ animationDelay: `${index * 0.1 + 0.1}s` }} />
              </div>
              
              {/* Description lines */}
              <div className="pt-2 space-y-2">
                <div className="h-3 bg-foreground/12 rounded w-full animate-pulse" 
                     style={{ animationDelay: `${index * 0.1 + 0.2}s` }} />
                <div className="h-3 bg-foreground/12 rounded w-11/12 animate-pulse" 
                     style={{ animationDelay: `${index * 0.1 + 0.25}s` }} />
                <div className="h-3 bg-foreground/12 rounded w-5/6 animate-pulse" 
                     style={{ animationDelay: `${index * 0.1 + 0.3}s` }} />
              </div>
              
              {/* Meta info with icons */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-4 bg-foreground/15 rounded animate-pulse" />
                  <div className="h-2 bg-foreground/12 rounded w-24 animate-pulse" />
                </div>
                <div className="w-1 h-1 bg-foreground/30 rounded-full" />
                <div className="flex items-center gap-2">
                  <div className="h-3 w-4 bg-foreground/15 rounded-full animate-pulse" />
                  <div className="h-2 bg-foreground/12 rounded w-16 animate-pulse" />
                </div>
                <div className="flex-1" />
                <div className="h-2 w-8 bg-foreground/12 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Pagination Skeleton */}
      <div 
        className="flex justify-center items-center mt-12 gap-4"
        style={{ animation: 'fadeInUp 0.6s ease-out 0.8s both' }}
      >
        <div className="relative overflow-hidden h-10 bg-foreground/10 rounded-lg w-24">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="relative overflow-hidden h-10 w-10 bg-foreground/10 rounded-lg"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
          ))}
        </div>
        <div className="relative overflow-hidden h-10 bg-foreground/10 rounded-lg w-24">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </>
  );
}

/**
 * Enhanced Blog Post Skeleton
 * Features: Progressive loading, shimmer waves, realistic content structure
 */
export function BlogPostSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
      {/* Article Card */}
      <article 
        className="bg-gray-400/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-foreground/10 p-6 md:p-10 mb-8 overflow-hidden relative"
        style={{ animation: 'fadeInUp 0.5s ease-out both' }}
      >
        {/* Global shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/6 to-transparent" 
             style={{ animationDuration: '2.5s' }} />
        
        {/* Header */}
        <div className="relative mb-8 pb-6 border-b border-foreground/10">
          {/* Title skeleton - multiple lines for long titles */}
          <div className="space-y-3 mb-6">
            <div className="h-11 bg-linear-to-r from-foreground/25 to-foreground/20 rounded-xl w-full animate-pulse" />
            <div className="h-11 bg-linear-to-r from-foreground/25 to-foreground/20 rounded-xl w-11/12 animate-pulse" 
                 style={{ animationDelay: '0.1s' }} />
            <div className="h-11 bg-linear-to-r from-foreground/25 to-foreground/20 rounded-xl w-3/4 animate-pulse" 
                 style={{ animationDelay: '0.2s' }} />
          </div>

          {/* Meta info with realistic spacing */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-foreground/15 rounded animate-pulse" />
              <div className="h-4 bg-foreground/12 rounded w-32 animate-pulse" />
            </div>
            <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full" />
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-foreground/15 rounded animate-pulse" 
                   style={{ animationDelay: '0.1s' }} />
              <div className="h-4 bg-foreground/12 rounded w-24 animate-pulse" 
                   style={{ animationDelay: '0.1s' }} />
            </div>
            <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-foreground/15 rounded-full animate-pulse" 
                   style={{ animationDelay: '0.2s' }} />
              <div className="h-4 bg-foreground/12 rounded w-28 animate-pulse" 
                   style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>

        {/* Content with realistic paragraph structures */}
        <div className="relative space-y-6">
          {[...Array(6)].map((_, paragraphIndex) => (
            <div key={paragraphIndex} className="space-y-2.5">
              {/* First line of paragraph - always full width */}
              <div className="h-4 bg-foreground/11 rounded-full w-full animate-pulse" 
                   style={{ animationDelay: `${paragraphIndex * 0.15}s` }} />
              
              {/* Middle lines - full width */}
              {[...Array(Math.floor(Math.random() * 3) + 2)].map((_, lineIndex) => (
                <div 
                  key={lineIndex}
                  className="h-4 bg-foreground/11 rounded-full w-full animate-pulse" 
                  style={{ animationDelay: `${paragraphIndex * 0.15 + lineIndex * 0.05}s` }} 
                />
              ))}
              
              {/* Last line - varied width for natural look */}
              <div 
                className="h-4 bg-foreground/11 rounded-full animate-pulse" 
                style={{ 
                  width: `${60 + Math.random() * 30}%`,
                  animationDelay: `${paragraphIndex * 0.15 + 0.3}s` 
                }} 
              />
              
              {/* Add occasional section breaks */}
              {paragraphIndex % 2 === 1 && (
                <div className="h-8" />
              )}
            </div>
          ))}
          
          {/* Featured quote block */}
          <div className="my-8 pl-6 border-l-4 border-foreground/20 space-y-2">
            <div className="h-5 bg-foreground/15 rounded-full w-11/12 animate-pulse" 
                 style={{ animationDelay: '1s' }} />
            <div className="h-5 bg-foreground/15 rounded-full w-10/12 animate-pulse" 
                 style={{ animationDelay: '1.05s' }} />
          </div>
          
          {/* More paragraphs */}
          {[...Array(4)].map((_, paragraphIndex) => (
            <div key={`bottom-${paragraphIndex}`} className="space-y-2.5">
              <div className="h-4 bg-foreground/11 rounded-full w-full animate-pulse" 
                   style={{ animationDelay: `${1.2 + paragraphIndex * 0.15}s` }} />
              {[...Array(Math.floor(Math.random() * 2) + 2)].map((_, lineIndex) => (
                <div 
                  key={lineIndex}
                  className="h-4 bg-foreground/11 rounded-full w-full animate-pulse" 
                  style={{ animationDelay: `${1.2 + paragraphIndex * 0.15 + lineIndex * 0.05}s` }} 
                />
              ))}
              <div 
                className="h-4 bg-foreground/11 rounded-full animate-pulse" 
                style={{ 
                  width: `${60 + Math.random() * 30}%`,
                  animationDelay: `${1.2 + paragraphIndex * 0.15 + 0.3}s` 
                }} 
              />
            </div>
          ))}
        </div>
      </article>

      {/* Share + Comments Card */}
      <div 
        className="bg-gray-400/30 backdrop-blur-xl rounded-2xl shadow-xl border border-foreground/10 p-6 md:p-8 overflow-hidden relative"
        style={{ animation: 'fadeInUp 0.5s ease-out 0.2s both' }}
      >
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/6 to-transparent" 
             style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        
        {/* Share section */}
        <div className="relative mb-8">
          <div className="h-6 bg-foreground/15 rounded-lg w-40 mb-4 animate-pulse" />
          <div className="flex gap-3">
            {['Twitter', 'Facebook', 'LinkedIn', 'Copy'].map((_, i) => (
              <div 
                key={i}
                className="relative overflow-hidden h-11 w-11 bg-foreground/12 rounded-full hover:bg-foreground/20 transition-colors"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/15 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Comments section */}
        <div className="relative border-t border-foreground/10 pt-8">
          <div className="h-6 bg-foreground/15 rounded-lg w-32 mb-6 animate-pulse" />
          <div className="space-y-5">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="relative p-5 bg-foreground/5 rounded-xl border border-foreground/5 overflow-hidden"
                style={{ animation: `fadeInUp 0.4s ease-out ${0.8 + i * 0.1}s both` }}
              >
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/8 to-transparent" 
                     style={{ animationDelay: `${1 + i * 0.2}s` }} />
                
                <div className="relative flex items-start gap-3 mb-3">
                  <div className="w-11 h-11 bg-foreground/15 rounded-full shrink-0 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-foreground/12 rounded w-36 animate-pulse" />
                    <div className="h-3 bg-foreground/10 rounded w-28 animate-pulse" 
                         style={{ animationDelay: '0.05s' }} />
                  </div>
                </div>
                <div className="relative space-y-2 ml-14">
                  <div className="h-3.5 bg-foreground/11 rounded-full w-full animate-pulse" />
                  <div className="h-3.5 bg-foreground/11 rounded-full w-11/12 animate-pulse" 
                       style={{ animationDelay: '0.05s' }} />
                  <div className="h-3.5 bg-foreground/11 rounded-full w-4/5 animate-pulse" 
                       style={{ animationDelay: '0.1s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Enhanced Hero Stats Skeleton
 * Features: Synchronized pulse, scale animations, shimmer sweeps
 */
export function HeroStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="group relative p-6 bg-gray-400/30 backdrop-blur-md border border-foreground/10 rounded-2xl overflow-hidden hover:border-foreground/20 transition-all duration-300"
          style={{ 
            animation: `fadeInScale 0.5s ease-out ${index * 0.1}s both`,
          }}
        >
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent" 
            style={{ animationDelay: `${index * 0.15}s` }}
          />
          
          {/* Content */}
          <div className="relative space-y-3 text-center">
            {/* Icon */}
            <div className="h-10 w-10 mb-2 bg-foreground/15 rounded-xl mx-auto animate-pulse" 
                 style={{ animationDelay: `${index * 0.1}s` }} />
            
            {/* Number */}
            <div className="h-9 bg-linear-to-r from-foreground/25 to-foreground/20 rounded-lg w-20 mx-auto animate-pulse" 
                 style={{ animationDelay: `${index * 0.1 + 0.05}s` }} />
            
            {/* Label */}
            <div className="h-4 bg-foreground/12 rounded w-16 mx-auto animate-pulse" 
                 style={{ animationDelay: `${index * 0.1 + 0.1}s` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Enhanced Search Results Skeleton
 * Features: Wave animation, progressive loading feel
 */
export function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="relative p-5 bg-gray-400/30 backdrop-blur-md border border-foreground/10 rounded-xl overflow-hidden hover:border-foreground/15 transition-colors"
          style={{ 
            animation: `slideInLeft 0.4s ease-out ${index * 0.08}s both`,
          }}
        >
          {/* Shimmer sweep */}
          <div 
            className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent" 
            style={{ animationDelay: `${index * 0.1}s` }}
          />
          
          {/* Content */}
          <div className="relative space-y-3">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-5 bg-foreground/20 rounded-lg w-4/5 animate-pulse" 
                   style={{ animationDelay: `${index * 0.08}s` }} />
            </div>
            
            {/* Description lines */}
            <div className="space-y-1.5">
              <div className="h-3.5 bg-foreground/11 rounded-full w-full animate-pulse" 
                   style={{ animationDelay: `${index * 0.08 + 0.05}s` }} />
              <div className="h-3.5 bg-foreground/11 rounded-full w-11/12 animate-pulse" 
                   style={{ animationDelay: `${index * 0.08 + 0.1}s` }} />
              <div className="h-3.5 bg-foreground/11 rounded-full w-2/3 animate-pulse" 
                   style={{ animationDelay: `${index * 0.08 + 0.15}s` }} />
            </div>
            
            {/* Meta info */}
            <div className="flex items-center gap-3 pt-1">
              <div className="h-3 bg-foreground/12 rounded w-20 animate-pulse" 
                   style={{ animationDelay: `${index * 0.08 + 0.2}s` }} />
              <div className="w-1 h-1 bg-foreground/30 rounded-full" />
              <div className="h-3 bg-foreground/12 rounded w-16 animate-pulse" 
                   style={{ animationDelay: `${index * 0.08 + 0.22}s` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Enhanced Recent Posts Skeleton
 * Features: Card lift effect, synchronized animations
 */
export function RecentPostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {[...Array(2)].map((_, index) => (
        <div 
          key={index}
          className="relative bg-gray-400/30 backdrop-blur-md border border-foreground/10 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-xl hover:border-foreground/20 transition-all duration-300"
          style={{ 
            animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
          }}
        >
          {/* Shimmer overlay */}
          <div 
            className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/8 to-transparent"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
          
          {/* Content */}
          <div className="relative space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-6 bg-foreground/20 rounded-lg w-11/12 animate-pulse" 
                   style={{ animationDelay: `${index * 0.15}s` }} />
              <div className="h-6 bg-foreground/20 rounded-lg w-3/4 animate-pulse" 
                   style={{ animationDelay: `${index * 0.15 + 0.05}s` }} />
            </div>
            
            {/* Description */}
            <div className="space-y-2 pt-2">
              <div className="h-4 bg-foreground/11 rounded-full w-full animate-pulse" 
                   style={{ animationDelay: `${index * 0.15 + 0.1}s` }} />
              <div className="h-4 bg-foreground/11 rounded-full w-full animate-pulse" 
                   style={{ animationDelay: `${index * 0.15 + 0.15}s` }} />
              <div className="h-4 bg-foreground/11 rounded-full w-11/12 animate-pulse" 
                   style={{ animationDelay: `${index * 0.15 + 0.2}s` }} />
              <div className="h-4 bg-foreground/11 rounded-full w-5/6 animate-pulse" 
                   style={{ animationDelay: `${index * 0.15 + 0.25}s` }} />
            </div>
            
            {/* Footer meta */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="h-3 bg-foreground/12 rounded w-20 animate-pulse" 
                     style={{ animationDelay: `${index * 0.15 + 0.3}s` }} />
                <div className="w-1 h-1 bg-foreground/30 rounded-full" />
                <div className="h-3 bg-foreground/12 rounded w-16 animate-pulse" 
                     style={{ animationDelay: `${index * 0.15 + 0.32}s` }} />
              </div>
              <div className="h-8 w-8 bg-foreground/12 rounded-lg animate-pulse" 
                   style={{ animationDelay: `${index * 0.15 + 0.35}s` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Import skeletonStyles.css in your app entry point:
 *    import './skeletonStyles.css';
 * 
 * 2. All animations are now CSS-based (no Tailwind config needed)
 * 
 * 3. Use components as-is - animations will work automatically
 * 
 * PERFORMANCE NOTES:
 * - All animations are GPU-accelerated
 * - Respects prefers-reduced-motion
 * - Optimized for 60fps rendering
 */