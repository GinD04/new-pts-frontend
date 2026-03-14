import { FormProps, InputProps } from '@heroui/react';
import { ReactElement, ReactNode } from 'react';

export interface IObserver {
    functions: ((option: AnyModalOptions) => void)[];
    subscribe: (func: { (options: AnyModalOptions): void }) => void;
    unsubscribe: (func: { (options: AnyModalOptions): void }) => void;
}

export interface IModalOptions {
    header?: string;
    message?: string;
    onApply?(data?: unknown): void;
    onCancel?(data?: unknown): void;
    type?: ModalType;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
}

export const MODAL_TYPE = {
    FORM: 'FORM',
    CONFIRM: 'CONFIRM',
    CUSTOM: 'CUSTOM',
} as const;

export type ModalType = keyof typeof MODAL_TYPE;

export interface IConfirmOptions extends IModalOptions {
    textButtonApply?: string;
    textButtonCancel?: string;
}

export interface ICustomModalOptions extends IModalOptions {
    body?: ReactNode;
    footer?: ReactNode;
}

type InputFieldType = Omit<InputProps, 'key'>;

export interface IFormModalOptions extends IModalOptions {
    fields: InputFieldType[];
    formOptions: FormProps;
    reset?: boolean;
    textButtonSubmit?: string;
    textButtonReset?: string;
}

export type AnyModalOptions =
    | (IConfirmOptions & { type: 'CONFIRM' })
    | (IFormModalOptions & { type: 'FORM' })
    | (ICustomModalOptions & { type: 'CUSTOM' });
