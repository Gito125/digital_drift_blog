import React, { SetStateAction } from 'react'
import AdminMenu from './AdminMenu'
import { Session } from 'next-auth'

interface UserDropDownProps {
    session: Session | null,
    handleLogout: () => Promise<void>,
    setDropDownOpen: (value: SetStateAction<boolean>) => void,
}

export default function UserDropDown({session, handleLogout, setDropDownOpen}: UserDropDownProps) {
    if (!session) return null

    return (
        <>
            <div className="absolute right-0 mt-2 w-56  border border-foreground/10 rounded-xl shadow-xl py-2 z-50 animate-fadeIn">
                <div className="px-4 py-3 border-b border-foreground/10">
                    <p className="text-sm text-foreground/70">Signed in as</p>
                    <p className="font-semibold text-foreground truncate">{session.user.email}</p>
                </div>
                <div className="py-1">
                    <AdminMenu session={session} closeMenu={() => setDropDownOpen(false)} />
                </div>
                <div className="py-1 ">
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-medium"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </>
    )
}
