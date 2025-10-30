'use client';

import { Button } from '@heroui/react';

export default function Home() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
            <Button className='bg-linear-to-tr from-pink-500 to-yellow-500 text-white shadow-lg' radius='full'>
                Button
            </Button>
        </div>
    );
}
