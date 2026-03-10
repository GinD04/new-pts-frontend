'use client';

import { useTestStore } from '@/store';
import { useEffect } from 'react';
import { Text } from '@/components';
import { useParams, useRouter } from 'next/navigation';
import { Button, CircularProgress, Divider } from '@heroui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useGetTestingById } from '@/gql';

export default function TestingPage() {
    const { 'testing-id': testingId } = useParams<{ 'testing-id': string }>();
    const { setQuestions, setDuration } = useTestStore();
    const router = useRouter();

    const { loading, data } = useGetTestingById(
        { id: testingId },
        {
            skip: !testingId,
        },
    );

    useEffect(() => {
        if (data?.testingById.questions) {
            setQuestions(data?.testingById.questions);
            setDuration(data?.testingById.duration);
        }
    }, [data, setQuestions, setDuration]);

    if (loading) {
        return <CircularProgress />;
    }

    const handleStartTest = () => {
        if (data?.testingById.questions.length !== 0) router.push(`1`);
    };

    const handleBack = () => {
        router.push('/testing');
    };

    return (
        <>
            <Text variant='h5'>{data?.testingById.title}</Text>
            <Divider />
            <Text variant='body2' className='w-fill max-w-xl'>
                {data?.testingById.description}
            </Text>
            <div className='w-full max-w-xl flex flex-row items-center justify-between gap-8 p-4'>
                <Button onPress={handleBack} startContent={<ArrowLeftIcon className='size-4' />} color='default'>
                    Назад
                </Button>
                <Button
                    endContent={<ArrowRightIcon className='size-4' />}
                    color='secondary'
                    onPress={handleStartTest}>
                    Начать
                </Button>
            </div>
        </>
    );
}
