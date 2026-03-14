'use client';

import { client } from '@/config';
import { ApolloProvider } from '@apollo/client/react';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { Modal } from '@/components';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <HeroUIProvider className='w-full h-full'>
            <ApolloProvider client={client}>
                <Modal />
                <ToastProvider />
                {children}
            </ApolloProvider>
        </HeroUIProvider>
    );
};
