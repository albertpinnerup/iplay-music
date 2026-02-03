'use client';
import { Link } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ViewTransitionLink({
    href,
    children,
    style,
}: {
    href: string;
    children: React.ReactNode;
    style?: string;
}) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default navigation
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                router.push(href); // Navigate programmatically
            });
        } else {
            // Fallback for non-supported browsers
            router.push(href);
        }
    };

    return (
        <Link href={href} onClick={handleClick} className={style}>
            {children}
        </Link>
    );
}
