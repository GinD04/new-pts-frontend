import { AnswerValueType, DropZone, IDraggableItem } from '@/components';
import { IAnswerData } from '@/shared';

export const isAnswerData = (item: unknown): item is IAnswerData => {
    return typeof item === 'object' && item !== null && 'answer' in item && 'order' in item;
};

export const isArrayAnswerData = (v?: AnswerValueType): v is IAnswerData[] =>
    Array.isArray(v) && v.every(isAnswerData);

export const toAnswerFormat = (locations: Record<string, string | null>, dropZones: DropZone[]): IAnswerData[] => {
    return Object.entries(locations)
        .filter(([, zoneId]) => zoneId !== null)
        .map(([itemId, zoneId]) => ({
            answer: itemId,
            order: String(Date.now()),
            zone: dropZones.find(z => z.id === zoneId)?.title ?? zoneId!,
        }));
};

export const fromAnswerFormat = (
    value: IAnswerData[],
    draggableItems: IDraggableItem[],
    dropZones: DropZone[],
): Record<string, string | null> => {
    const result: Record<string, string | null> = {};
    draggableItems.forEach(item => {
        result[item.id] = null;
    });
    value.forEach(({ answer, zone }) => {
        if (zone) {
            const foundZone = dropZones.find(z => z.title === zone);
            result[answer] = foundZone?.id ?? null;
        }
    });
    return result;
};
