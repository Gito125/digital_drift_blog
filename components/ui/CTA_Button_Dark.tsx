import Link from 'next/link'

export default function CTA_Button_Dark({ text, linkTo }: { text: string, linkTo: string }) {
    return (
        <Link
            href={linkTo}
            className="group px-8 py-4 bg-linear-to-r from-accent to-accent/90 text-white rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 text-lg font-semibold shadow-xl hover:shadow-2xl relative overflow-hidden"
        >
            <button className="relative z-10 flex items-center justify-center gap-2 cursor-pointer">
                {text}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </button>
        </Link>

    )
}
