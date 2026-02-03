'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { House, Library, Play, Search, Settings, type LucideIcon } from 'lucide-react';
import { useSpotifyPlayback } from './hooks/useSpotifyPlayback';
import NavPlayer from './NavPlayer';

type NavItem = {
    id: string;
    label: string;
    href: string;
    icon: LucideIcon;
};

const navItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '/dashboard', icon: House },
    { id: 'search', label: 'Search', href: '/search', icon: Search },
    { id: 'player', label: 'Player', href: '/player', icon: Play },
    { id: 'library', label: 'Library', href: '/library', icon: Library },
    { id: 'settings', label: 'Settings', href: '/settings', icon: Settings },
];

export default function NavBar() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href || pathname.includes(`${href}/`);

    return (
        <>
            <NavPlayer />
            <svg width='0' height='0' className='absolute'>
                <linearGradient
                    gradientUnits='userSpaceOnUse'
                    id='icon-gradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='100%'
                >
                    <stop offset='0%' stopColor='#EE0979' />
                    <stop offset='100%' stopColor='#FF6A00' />
                </linearGradient>
            </svg>
            <nav>
                <ul className='flex items-center justify-between px-8 h-16 gap-4 dark:bg-[#111625]'>
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;

                        return (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    className={
                                        item.id === 'player'
                                            ? 'bg-linear-to-br from-[#EE0979] to-[#FF6A00] flex p-2 rounded-full'
                                            : ''
                                    }
                                >
                                    <Icon
                                        size={item.id === 'media' ? 25 : 20}
                                        aria-hidden='true'
                                        stroke={
                                            active || item.id === 'player'
                                                ? '#fff'
                                                : 'url(#icon-gradient)'
                                        }
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
