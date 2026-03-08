import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DroppableZoneProps } from './dnd.types';
import { H6 } from '@/components';
import { getItems } from './drag-items.utils';

export const DroppableZone: React.FC<DroppableZoneProps> = ({
    zone,
    items,
    renderItem,
    renderDropZone,
    required = false,
    isZoneFull = false,
}) => {
    const isFull = isZoneFull ?? !!(zone.maxItems && items.length >= zone.maxItems);

    const { setNodeRef } = useSortable({
        id: zone.id,
        disabled: isFull,
    });

    if (renderDropZone) {
        return (
            <div ref={setNodeRef} className=''>
                {renderDropZone(zone, items, isFull, required)}
            </div>
        );
    }

    return (
        <div ref={setNodeRef} className='flex flex-col items-center min-w-3xs max-w-sm h-full'>
            <H6>{zone.title || zone.id}</H6>
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                <div
                    className={`flex flex-row gap-2 flex-wrap items-center border ${isFull && 'border-success'} ${required && 'border-danger'} rounded-lg p-3 w-full select-none`}>
                    {getItems(items, renderItem)}
                </div>
            </SortableContext>
        </div>
    );
};
