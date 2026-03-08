import { UniqueIdentifier } from '@dnd-kit/core';
import { ReactNode } from 'react';

export interface DroppableProps<T = unknown> {
    id: string;
    data?: T;
    activeClassName?: string;
    overClassName?: string;
    children: ReactNode;
    className?: string;
    acceptTypes?: string[];
    onHoverChange?: (isOver: boolean) => void;
    onActiveChange?: (isActive: boolean) => void;
}

export interface DraggableWrapperProps {
    id: UniqueIdentifier;
    data?: unknown;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    withHandle?: boolean;
    handlePosition?: 'left' | 'right' | 'top' | 'bottom';
    handleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export interface IDraggableItem {
    id: string;
    content: React.ReactNode;
    data?: unknown;
}

export interface DropZone {
    id: string;
    title?: string;
    accepts?: string[];
    maxItems?: number;
    minItems?: number;
}

export interface DragDropComponentProps {
    draggableItems: IDraggableItem[];
    dropZones: DropZone[];
    onItemMove?: (itemId: string, fromZone: string | null, toZone: string | null) => void;
    renderItem?: (item: IDraggableItem, isDragging?: boolean) => React.ReactNode;
    renderDropZone?: (zone: DropZone, items: IDraggableItem[]) => React.ReactNode;
    className?: string;
    value?: Record<string, string | null>;
    onChange?: (locations: Record<string, string | null>) => void;
}

export interface MapComponentProps {
    items: IDraggableItem[];
    zones: DropZone[];
    onItemMove?: (itemId: string, fromZone: string | null, toZone: string | null) => void;
    className?: string;
    value?: Record<string, string | null>;
    onChange?: (locations: Record<string, string | null>) => void;
}

export interface SortableItemProps {
    item: IDraggableItem;
    renderItem?: (item: IDraggableItem, isDragging?: boolean) => React.ReactNode;
}

export interface DroppableZoneProps {
    zone: DropZone;
    items: IDraggableItem[];
    renderItem?: (item: IDraggableItem, isDragging?: boolean) => React.ReactNode;
    renderDropZone?: (
        zone: DropZone,
        items: IDraggableItem[],
        isFull?: boolean,
        required?: boolean,
    ) => React.ReactNode;
    required?: boolean;
    isZoneFull?: boolean;
}
