export interface TimerProps {
    initialSeconds?: number;
    autoStart?: boolean;
    onTimeUp?: () => void;
    onStartTimer?: () => void;
    onPauseTimer?: () => void;
    onTick?: (s: number) => void;
}
