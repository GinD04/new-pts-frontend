import { AnswerType } from '@/shared';

export interface Option {
    id: string | number;
    label: string;
    value: string | number;
}

export type AnswerValueType = string | number | string[] | number[];

export interface AnswerProps {
    id: string;
    type: AnswerType;
    label?: string;
    options?: Option[];
    value?: AnswerValueType;
    placeholder?: string;
    required?: boolean;
    onChange?: (value: AnswerValueType) => void;
    className?: string;
}

export const OPTIONS: Record<AnswerType, React.ReactNode> = {
    SINGLE: null,
    MULTIPLY: null,
    STRING: null,
    TEXT: null,
    DRAG: null,
    MAP: null,
    NUMBER: null,
};
