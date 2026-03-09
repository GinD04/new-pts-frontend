export interface UseTimerProps {
    initialSeconds?: number;
    autoStart?: boolean;
    onTimeUp?: () => void;
    onStartTimer?: () => void;
    onPauseTimer?: () => void;
}

export interface UseTimerReturn {
    seconds: number;
    isActive: boolean;
    isPaused: boolean;
    formattedTime: string;

    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    setTimerValue: (newSeconds: number) => void;
    addMinutes: (minutes: number) => void;
}
