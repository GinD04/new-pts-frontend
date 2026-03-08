import React from 'react';
import { TimerProps } from './timer.types';
import { Body1 } from '../text';
import { Button } from '@heroui/react';
import { PauseIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useTimer } from '@/hooks';

export const Timer: React.FC<TimerProps> = ({
    initialSeconds = 0,
    autoStart = false,
    onTimeUp,
    onStartTimer,
    onPauseTimer,
}) => {
    const { isActive, pauseTimer, formattedTime, seconds, startTimer } = useTimer({
        autoStart,
        initialSeconds,
        onTimeUp,
        onStartTimer,
        onPauseTimer,
    });

    return (
        <div className='flex flex-row items-center gap-2'>
            <Body1>{formattedTime}</Body1>
            {!isActive && seconds > 0 && (
                <Button
                    onPress={startTimer}
                    color='default'
                    variant='light'
                    isIconOnly
                    startContent={<PlayIcon className='size-5' />}
                />
            )}

            {isActive && (
                <Button
                    onPress={pauseTimer}
                    color='default'
                    variant='light'
                    isIconOnly
                    startContent={<PauseIcon className='size-5' />}
                />
            )}
        </div>
    );
};
