import { create } from 'zustand';
import { TimerStore } from './timer.types';

export const useTimerStore = create<TimerStore>((set, get) => ({
    seconds: 0,
    isActive: false,
    isPaused: false,
    intervalRef: null,

    setSeconds: seconds => set({ seconds }),
    setIsActive: isActive => set({ isActive }),
    setIsPaused: isPaused => set({ isPaused }),

    startInterval: onTimeUp => {
        const { intervalRef } = get();
        if (intervalRef) return;

        const ref = setInterval(() => {
            const { seconds } = get();
            if (seconds <= 1) {
                clearInterval(ref);
                set({ intervalRef: null, isActive: false, seconds: 0 });
                onTimeUp?.();
                return;
            }
            set({ seconds: seconds - 1 });
        }, 1000);

        set({ intervalRef: ref, isActive: true, isPaused: false });
    },

    stopInterval: () => {
        const { intervalRef } = get();
        if (intervalRef) {
            clearInterval(intervalRef);
            set({ intervalRef: null });
        }
    },

    init: initialSeconds => {
        const { stopInterval } = get();
        stopInterval();
        set({ seconds: initialSeconds, isActive: false, isPaused: false });
    },

    clear: () => {
        const { stopInterval } = get();
        stopInterval();
        set({ seconds: 0, isActive: false, isPaused: false });
    },
}));
