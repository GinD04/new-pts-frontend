'use client';

import { client } from '@/config';
import { ApolloProvider } from '@apollo/client/react';
import { HeroUIProvider } from '@heroui/react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <HeroUIProvider className='w-full h-full'>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </HeroUIProvider>
    );
};
