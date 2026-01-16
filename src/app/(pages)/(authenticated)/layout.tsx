import Header from '@/components/Header';
import NavBar from '@/components/NavBar';

export default function AuthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex flex-col min-h-screen dark:bg-[#341931]'>
            <header>
                <Header />
            </header>
            <main className='p-4'>{children}</main>
            <footer className='absolute bottom-0 w-full'>
                <NavBar />
            </footer>
        </div>
    );
}
