'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const pathnameArr = pathname.split('/');

    return (
        <div className='py-3 px-2'>
            {pathnameArr.length > 2 && <ChevronLeft size={30} onClick={() => router.back()} />}
        </div>
    );
}
