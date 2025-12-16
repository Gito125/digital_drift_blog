import React from 'react'

export default function SocialLogins() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 border border-foreground/20 rounded-xl bg-background/50 hover:bg-foreground/5 transition-all duration-200 group"
            >
                <span className="text-xl">🌐</span>
                <span className="text-sm font-medium text-foreground">Google</span>
            </button>
            <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 border border-foreground/20 rounded-xl bg-background/50 hover:bg-foreground/5 transition-all duration-200 group"
            >
                <span className="text-xl">💼</span>
                <span className="text-sm font-medium text-foreground">GitHub</span>
            </button>
        </div>
    )
}
