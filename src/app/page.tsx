import AuthButton from '@/components/AuthButton';
import SplashScreen from '@/components/SplashScreen';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) redirect('/dashboard');
    return (
        <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-8 px-8 bg-white dark:bg-[#341931] '>
            <SplashScreen />
        </main>
    );
}
