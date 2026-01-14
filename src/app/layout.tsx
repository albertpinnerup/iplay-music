import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';

export const metadata: Metadata = {
    title: {
        template: '%s | IPlayMusic',
        default: 'IplayMusic',
    },
    description: 'A modern music player',
};

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={poppins.className}>
                <div className='flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-[#341931] '>
                    <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-[#341931] sm:items-start'>
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
