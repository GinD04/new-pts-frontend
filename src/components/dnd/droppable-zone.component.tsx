import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableItem } from './draggable-item.component';
import { DroppableZoneProps, IDraggableItem } from './dnd.types';
import { Body2, H6 } from '@/components';

const getItems = (
    items: IDraggableItem[],
    renderItem?: (item: IDraggableItem, isDragging?: boolean) => React.ReactNode,
) => (
    <div className='flex flex-col items-center border rounded-lg p-3 w-full min-h-full select-none'>
        {items.length === 0 ? (
            <Body2 className='opacity-70'>Перетащите элементы сюда</Body2>
        ) : (
            items.map(item => <DraggableItem key={item.id} item={item} renderItem={renderItem} />)
        )}
    </div>
);

export const DroppableZone: React.FC<DroppableZoneProps> = ({
    zone,
    items,
    renderItem,
    renderDropZone,
    isSortable = false,
}) => {
    const { setNodeRef } = useSortable({ id: zone.id });

    if (renderDropZone) {
        return <div ref={setNodeRef}>{renderDropZone(zone, items)}</div>;
    }

    return (
        <div ref={setNodeRef} className='flex flex-col items-center min-w-3xs h-full'>
            <H6>{zone.title || zone.id}</H6>
            <SortableContext
                items={items.map(item => item.id)}
                strategy={isSortable ? verticalListSortingStrategy : undefined}>
                {getItems(items, renderItem)}
            </SortableContext>
        </div>
    );
};
