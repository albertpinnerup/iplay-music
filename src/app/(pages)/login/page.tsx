import AuthButton from '@/components/AuthButton';

export default async function loginPage() {
    return (
        <main className='mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 bg-white px-8 py-8 dark:bg-[#FF1168]'>
            <h1 className='text-start text-4xl text-black dark:text-white'>Login</h1>

            {/* This takes up all remaining vertical space */}
            <div className='flex flex-1 items-center justify-center'>
                <AuthButton text='Sign in with Spotify' />
            </div>
        </main>
    );
}
