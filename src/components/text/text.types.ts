import { ElementType, ReactNode } from 'react';
import { COLOR_STYLES } from './text.styles';

export const VARIANT_MAP = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'p',
    subtitle2: 'p',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    overline: 'span',
} as const;

export type Variant = keyof typeof VARIANT_MAP;
export type Color = keyof typeof COLOR_STYLES;
export type Tag = (typeof VARIANT_MAP)[Variant];

export interface TextProps {
    children: ReactNode;
    variant?: Variant;
    color?: Color;
    as?: ElementType;
    className?: string;
}
