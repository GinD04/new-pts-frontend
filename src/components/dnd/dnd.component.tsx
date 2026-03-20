'use client';

import React, { useState } from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DragDropComponentProps, IDraggableItem } from './dnd.types';
import { DroppableZone } from './droppable-zone.component';
import { SourceArea } from './source-area.component';

export const DragDrop: React.FC<DragDropComponentProps> = ({
    draggableItems,
    dropZones,
    onItemMove,
    renderItem,
    renderDropZone,
    className = '',
    value,
    onChange,
}) => {
    const getInitialLocations = () => {
        const initial: Record<string, string | null> = {};
        draggableItems.forEach(item => {
            initial[item.id] = null;
        });
        return initial;
    };

    const [internalLocations, setInternalLocations] = useState<Record<string, string | null>>(
        () => value ?? getInitialLocations(),
    );

    const itemLocations = value ?? internalLocations;

    const setItemLocations = (updater: (prev: Record<string, string | null>) => Record<string, string | null>) => {
        const next = updater(itemLocations);
        setInternalLocations(next);
        onChange?.(next);
    };

    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    const getItemsForZone = (zoneId: string | null): IDraggableItem[] => {
        return draggableItems.filter(item => itemLocations[item.id] === zoneId);
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeItemId = active.id as string;
        const overId = over.id as string;

        let targetZoneId: string | null;

        if (overId === 'source-zone') {
            targetZoneId = null;
        } else {
            const isDropZone = dropZones.some(zone => zone.id === overId);
            targetZoneId = isDropZone ? overId : (itemLocations[overId] ?? null);
        }

        if (targetZoneId !== null) {
            const targetZone = dropZones.find(zone => zone.id === targetZoneId);
            const targetItems = getItemsForZone(targetZoneId);

            if (targetZone?.maxItems !== undefined && targetItems.length >= targetZone.maxItems) {
                setActiveId(null);
                return;
            }
        }

        const currentZoneId = itemLocations[activeItemId];

        if (currentZoneId !== targetZoneId) {
            setItemLocations(prev => ({
                ...prev,
                [activeItemId]: targetZoneId,
            }));

            if (onItemMove) {
                onItemMove(activeItemId, currentZoneId, targetZoneId);
            }
        }

        setActiveId(null);
    };

    const handleDragCancel = () => {
        setActiveId(null);
    };

    const allIds = [...draggableItems.map(item => item.id), ...dropZones.map(zone => zone.id)];

    const activeItem = activeId ? draggableItems.find(item => item.id === activeId) : null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}>
            <SortableContext items={allIds} strategy={verticalListSortingStrategy}>
                <div
                    className={`flex h-fit max-h-full overflow-auto justify-between w-full p-2 gap-4 md:p-4 ${className}`}>
                    <SourceArea items={getItemsForZone(null)} renderItem={renderItem} />
                    <div className='flex flex-col gap-4'>
                        {dropZones.map(zone => (
                            <DroppableZone
                                key={zone.id}
                                zone={zone}
                                items={getItemsForZone(zone.id)}
                                renderItem={renderItem}
                                renderDropZone={renderDropZone}
                            />
                        ))}
                    </div>
                </div>
            </SortableContext>

            <DragOverlay>
                {activeItem ? (
                    <div className='opacity-90 transform rotate-1 shadow-xl rounded-lg border-2 border-secondary bg-white w-max'>
                        {renderItem ? (
                            renderItem(activeItem, true)
                        ) : (
                            <div className='p-3 bg-white rounded-lg shadow'>{activeItem.content}</div>
                        )}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
