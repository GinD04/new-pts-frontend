import { IZoneInfo } from '@/shared';
import { DropZone, IDraggableItem } from '@/components';
import { Option } from './answer.types';

export const getDropZones = (zones: IZoneInfo[]): DropZone[] => {
    return zones.map((zone, i) => ({
        id: `zone-${i}`,
        title: zone.name,
        maxItems: zone.max,
    }));
};

export const getDragItems = (answers: Option[]): IDraggableItem[] => {
    return answers.map(a => ({
        id: String(a.value),
        content: a.label,
        data: a.value,
    }));
};
