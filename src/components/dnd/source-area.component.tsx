import { useDroppable } from '@dnd-kit/core';
import { IDraggableItem } from './dnd.types';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { H6, Body1, Body2 } from '@/components';
import { DraggableItem } from './draggable-item.component';

export const SourceArea: React.FC<{
    items: IDraggableItem[];
    renderItem?: (item: IDraggableItem, isDragging?: boolean) => React.ReactNode;
}> = ({ items, renderItem }) => {
    const { setNodeRef } = useDroppable({ id: 'source-zone' });

    return (
        <div
            ref={setNodeRef}
            className={`max-w-sm max-h-sm overflow-y-hidden flex flex-col gap-2 p-4 rounded-lg shadow-neutral-400 shadow-lg transition-colors`}>
            <H6 className='flex gap-4 items-center'>
                Доступные элементы
                <Body1 className='border rounded-4xl px-2' color='primary'>
                    {items.length}
                </Body1>
            </H6>
            <div className='p-4 h-full min-h-4 flex flex-wrap gap-2 max-h-xs overflow-y-auto'>
                {items.length > 0 ? (
                    <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                        {items.map(item => (
                            <DraggableItem key={item.id} item={item} renderItem={renderItem} />
                        ))}
                    </SortableContext>
                ) : (
                    <Body2 className='text-gray-500 text-center'>Нет доступных элементов</Body2>
                )}
            </div>
        </div>
    );
};
