import { Body2 } from '../text';
import { IDraggableItem } from './dnd.types';
import { DraggableItem } from './draggable-item.component';

export const getItems = (
    items: IDraggableItem[],
    renderItem?: (item: IDraggableItem, isDragging?: boolean) => React.ReactNode,
) => (
    <>
        {items.length === 0 ? (
            <Body2 className='opacity-70'>Перетащите элементы сюда</Body2>
        ) : (
            items.map(item => <DraggableItem key={item.id} item={item} renderItem={renderItem} />)
        )}
    </>
);
