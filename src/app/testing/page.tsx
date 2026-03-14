'use client';
import { H4, TestingCard } from '@/components';
import { useGetAllTesting } from '@/gql';
import { formatDate, formatDuration } from '@/shared';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { addToast, Button, CircularProgress, Divider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { authService } from '@/services';

export default function AllTestingsPage() {
    const { loading, data } = useGetAllTesting();
    const { clear } = useAuthStore();
    const router = useRouter();

    const handlePressTestingCard = (id?: number) => {
        if (id) router.push(`${id}`);
    };

    const handleLogout = () => {
        clear();
        authService
            .logout()
            .then(() => router.push('/login'))
            .catch(error =>
                addToast({
                    title: 'Ошибка',
                    description: error.message,
                    variant: 'solid',
                    color: 'danger',
                }),
            );
    };

    return (
        <>
            <header className='w-full max-w-xl flex justify-between items-center'>
                <Button
                    onPress={handleLogout}
                    startContent={<ArrowLeftIcon className='size-4' />}
                    color='default'
                    variant='light'>
                    Выйти
                </Button>
            </header>
            <H4>Текущие тестирования</H4>
            <Divider />
            <div className='max-w-[1200px] max-h-3/4 flex flex-wrap items-center justify-center gap-4 px-8'>
                {(data?.testing ?? []).map(testing => (
                    <TestingCard
                        key={`card-${testing.id}`}
                        title={testing.title}
                        duration={formatDuration(testing.duration ?? 0)}
                        startTime={formatDate(testing.startTime ?? '')}
                        onPress={() => handlePressTestingCard(testing.id)}
                    />
                ))}

                {loading && <CircularProgress aria-label='Loading...' color='primary' />}
            </div>
        </>
    );
}
