import { AnswerType } from '@/shared';

export interface Option {
    id: string | number;
    label: string;
    value: string | number;
}

export interface AnswerProps {
    id: string;
    type: AnswerType;
    label: string;
    options?: Option[];
    value?: string | number | string[] | number[];
    placeholder?: string;
    required?: boolean;
    onChange?: (value: unknown) => void;
}

export const OPTIONS: Record<AnswerType, React.ReactNode> = {
    SINGLE: null,
    MULTIPLY: null,
    STRING: null,
    TEXT: null,
    DRAG: null,
    MAP: null,
};
