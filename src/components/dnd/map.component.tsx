'use client';

import { FC } from 'react';
import { DropZone, IDraggableItem, MapComponentProps } from './dnd.types';
import { DragDrop } from './dnd.component';
import { Body1 } from '@/components';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { getItems } from './drag-items.utils';

export const MapComponent: FC<MapComponentProps> = ({
    items,
    zones,
    onItemMove,
    className = '',
    onChange,
    value,
}) => {
    const renderDropZone = (zone: DropZone, items: IDraggableItem[], required?: boolean, isFull?: boolean) => (
        <div className='flex gap-2 max-w-3xs w-fit'>
            <Body1 className='text-nowrap'>{zone.title || zone.id}</Body1>
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                <div
                    className={`flex flex-row gap-2 flex-wrap items-center border  ${isFull && 'border-success'} ${required && 'border-danger'} rounded-lg p-1 w-fit max-w-3xs min-h-full select-none`}>
                    {getItems(items)}
                </div>
            </SortableContext>
        </div>
    );
    return (
        <DragDrop
            draggableItems={items}
            dropZones={zones}
            onItemMove={onItemMove}
            className={`justify-center ${className}`}
            renderDropZone={renderDropZone}
            onChange={onChange}
            value={value}
        />
    );
};
