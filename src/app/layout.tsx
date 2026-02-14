import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const jost = Jost({
    variable: '--font-jost',
    subsets: ['cyrillic', 'latin'],
    weight: ['100', '300', '400', '500', '600'],
    fallback: ['arial', 'sans-serif'],
});

export const metadata: Metadata = {
    title: 'PTS',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ru'>
            <body
                className={`${jost.className} webkit-font-smoothing="antialiased" -webkit-text-s'use server';antialiased`}>
                <Providers>{children}</Providers>
                {/* {children} */}
            </body>
        </html>
    );
}
