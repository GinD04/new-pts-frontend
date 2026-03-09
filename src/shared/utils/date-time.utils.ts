import dayjs from 'dayjs';

export const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${String(hours).padStart(2, '0')}:${paddedMinutes}:${paddedSeconds}`;
};

export function formatDate(dateString: string, format: string = 'DD.MM.YYYY HH:mm'): string {
    return dayjs(dateString).format(format);
}
