import React from 'react'

export default function SignoutButton({ handleLogout }: { handleLogout: () => Promise<void> }) {
    return (
        <>
            <button
                onClick={handleLogout}
                className="w-full px-4 py-3 rounded-lg text-left bg-foreground/5 text-red-600 dark:text-red-500 hover:bg-foreground/10 cursor-pointer transition-all font-medium flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
            </button>
        </>)
}
