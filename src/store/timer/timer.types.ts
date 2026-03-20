export interface TimerState {
    seconds: number;
    isActive: boolean;
    isPaused: boolean;
    intervalRef: NodeJS.Timeout | null;
}

export interface TimerActions {
    setSeconds: (seconds: number) => void;
    setIsActive: (isActive: boolean) => void;
    setIsPaused: (isPaused: boolean) => void;
    startInterval: (onTimeUp?: () => void) => void;
    stopInterval: () => void;
    init: (initialSeconds: number) => void;
    clear: () => void;
}

export type TimerStore = TimerState & TimerActions;
