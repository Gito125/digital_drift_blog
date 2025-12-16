"use client"

// AnimatedGradientOrbs.tsx
// This component creates animated gradient orbs in the background.
// It uses absolute positioning and CSS animations to create a dynamic visual effect.

const AnimatedGradientOrbs = () => {
    return (
        <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-accent/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-accent/40 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-2xl"></div>
        </div>
    )
}

export default AnimatedGradientOrbs