"use client"

// PulsingBadge.tsx
// This component displays a pulsing badge indicating a live update or announcement.
// It uses Tailwind CSS for styling and animation.

interface PulsingBadgeProps {
    text: string
}

const PulsingBadge = ({text}: PulsingBadgeProps) => {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent font-medium mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            {text}
        </div>
    )
}

export default PulsingBadge