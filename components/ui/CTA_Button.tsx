import Link from 'next/link'

export default function CTA_Button({ text, linkTo }: { text: string, linkTo: string }) {
    return (
        <Link
            href={linkTo}
            className="py-2 px-3 bg-accent text-text-dark rounded-lg hover:opacity-90 transition-all font-medium shadow-md"
        >
            {text}
        </Link>

    )
}
