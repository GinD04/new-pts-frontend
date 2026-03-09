import { useState, useEffect, useRef, useCallback } from 'react';
import { UseTimerProps, UseTimerReturn } from './timer.types';
import { formatDuration } from '@/shared';

export const useTimer = ({
    initialSeconds = 0,
    autoStart = false,
    onTimeUp,
    onPauseTimer,
    onStartTimer,
}: UseTimerProps = {}): UseTimerReturn => {
    const [seconds, setSeconds] = useState<number>(() => initialSeconds);
    const [isActive, setIsActive] = useState<boolean>(autoStart);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const onTimeUpRef = useRef(onTimeUp);
    const initialSecondsRef = useRef(initialSeconds);

    const formattedTime = formatDuration(seconds);

    useEffect(() => {
        onTimeUpRef.current = onTimeUp;
    }, [onTimeUp]);

    useEffect(() => {
        initialSecondsRef.current = initialSeconds;
    }, [initialSeconds]);

    const clearTimerInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startTimer = () => {
        if (seconds > 0) {
            setIsActive(true);
            setIsPaused(false);
            onStartTimer?.();
        }
    };

    const pauseTimer = () => {
        setIsActive(false);
        setIsPaused(true);
        onPauseTimer?.();
        clearTimerInterval();
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsPaused(false);
        setSeconds(initialSecondsRef.current);
        clearTimerInterval();
    };

    const setTimerValue = useCallback((newSeconds: number) => {
        setSeconds(Math.max(0, newSeconds));
    }, []);

    const addMinutes = useCallback((minutes: number) => {
        setSeconds(prev => prev + minutes * 60);
    }, []);

    useEffect(() => {
        if (isActive && seconds > 0) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => {
                    if (prev <= 1) {
                        setIsActive(false);
                        if (onTimeUpRef.current) {
                            onTimeUpRef.current();
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return clearTimerInterval;
    }, [isActive, seconds, clearTimerInterval]);

    return {
        seconds,
        isActive,
        isPaused,
        formattedTime,
        startTimer,
        pauseTimer,
        resetTimer,
        setTimerValue,
        addMinutes,
    };
};
