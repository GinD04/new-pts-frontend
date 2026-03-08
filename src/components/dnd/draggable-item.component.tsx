import { useSortable } from '@dnd-kit/sortable';
import { SortableItemProps } from './dnd.types';
import { CSS } from '@dnd-kit/utilities';

export const DraggableItem: React.FC<SortableItemProps> = ({ item, renderItem }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        maxWidth: '100%',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {renderItem ? (
                renderItem(item, isDragging)
            ) : (
                <div className='rounded-lg p-1 bg-gray-100 mt-0.5 max-w-full w-fit truncate'>{item.content}</div>
            )}
        </div>
    );
};
