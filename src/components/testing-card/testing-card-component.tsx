import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { Body1, H6 } from '@/components';
import { TestingCardProps } from './testing-card.types';
import { CalendarDateRangeIcon, ClockIcon } from '@heroicons/react/24/outline';

export const TestingCard = ({ title, duration, startTime, onPress }: TestingCardProps) => (
    <div className='p-0.5 rounded-xl bg-linear-to-tl from-primary to-secondary'>
        <Card isPressable isBlurred className='w-65' onPress={onPress}>
            <CardHeader className='max-w-full'>
                <H6 className='truncate'>{title}</H6>
            </CardHeader>
            <CardBody className='flex flex-row gap-2 items-center'>
                <ClockIcon className='size-5' />
                <Body1>{duration ?? 'Не ограничено'}</Body1>
            </CardBody>
            {startTime && (
                <CardFooter className='flex flex-row gap-2 items-center'>
                    <CalendarDateRangeIcon className='size-5' />
                    <Body1>{startTime}</Body1>
                </CardFooter>
            )}
        </Card>
    </div>
);
