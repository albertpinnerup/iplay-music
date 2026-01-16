import AuthButton from '@/components/AuthButton';
import SplashScreen from '@/components/SplashScreen';

export default async function Home() {
    return (
        <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-8 px-8 bg-white dark:bg-[#341931] '>
            <SplashScreen />
        </main>
    );
}
