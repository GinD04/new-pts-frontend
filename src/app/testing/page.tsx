'use client';
import { H4, TestingCard } from '@/components';
import { useGetAllTesting } from '@/gql';
import { formatDate, formatDuration } from '@/shared';
import { CircularProgress, Divider } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function AllTestingsPage() {
    const { loading, data } = useGetAllTesting();
    const router = useRouter();

    const handlePressTestingCard = (id?: number) => {
        if (id) router.push(`testing/${id}`);
    };

    return (
        <>
            <H4>Текущие тестирования</H4>
            <Divider />
            <div className='max-w-[1200px] max-h-3/4 flex flex-wrap items-center justify-center gap-4 px-8'>
                {(data?.testing ?? []).map((testing, id) => (
                    <TestingCard
                        key={`card-${id}`}
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
