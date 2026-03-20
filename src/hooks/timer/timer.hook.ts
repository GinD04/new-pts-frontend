import { useEffect, useRef, useCallback } from 'react';
import { UseTimerProps } from './timer.types';
import { formatDuration } from '@/shared';
import { useTimerStore } from '@/store';

export const useTimer = ({
    initialSeconds = 0,
    autoStart = false,
    onTimeUp,
    onPauseTimer,
    onStartTimer,
}: UseTimerProps = {}) => {
    const { seconds, isActive, isPaused, startInterval, stopInterval, init } = useTimerStore();
    const onTimeUpRef = useRef(onTimeUp);

    useEffect(() => {
        onTimeUpRef.current = onTimeUp;
    }, [onTimeUp]);

    const startTimer = useCallback(() => {
        onStartTimer?.();
        startInterval(onTimeUpRef.current);
    }, [startInterval, onStartTimer]);

    const pauseTimer = useCallback(() => {
        stopInterval();
        useTimerStore.getState().setIsActive(false);
        useTimerStore.getState().setIsPaused(true);
        onPauseTimer?.();
    }, [stopInterval, onPauseTimer]);

    const resetTimer = useCallback(() => {
        init(initialSeconds);
    }, [init, initialSeconds]);

    useEffect(() => {
        init(initialSeconds);
        if (autoStart && initialSeconds > 0) {
            setTimeout(() => startTimer(), 0);
        }
    }, []);

    return {
        seconds,
        isActive,
        isPaused,
        formattedTime: formatDuration(seconds),
        canStart: !isActive && seconds > 0,
        canPause: isActive,
        startTimer,
        pauseTimer,
        resetTimer,
        setTimerValue: (s: number) => useTimerStore.getState().setSeconds(Math.max(0, s)),
        addMinutes: (m: number) => useTimerStore.getState().setSeconds(seconds + m * 60),
    };
};
