'use client';

export default function TestingLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='max-h-full max-w-full w-full h-full m-auto flex overflow-auto'>
            <div className='w-full flex flex-col items-center justify-center gap-8'>{children}</div>
        </main>
    );
}
