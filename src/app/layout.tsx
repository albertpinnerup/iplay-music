import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

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
        <html lang='en' suppressHydrationWarning>
            <body className={`${poppins.className} text-black dark:text-white`}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    {/* items-center justify-center  */}
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
