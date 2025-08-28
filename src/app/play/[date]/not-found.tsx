import Link from 'next/link'
import 'tailwindcss'

export default function NotFound() {
    return (
        // TODO: Show the Hanged Man
        <div className="text-foreground">
            <h2>Invalid Date</h2>
            <p>{"You can't use this date, buster."}</p>
            <Link href="/play" className="hover:text-gold">
                Pick Another
            </Link>
        </div>
    )
}
