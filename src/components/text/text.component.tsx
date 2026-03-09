'use client';

import { ComponentPropsWithoutRef } from 'react';
import { Tag, TextProps, Variant, VARIANT_MAP } from './text.types';
import { COLOR_STYLES, VARIANT_STYLES } from './text.styles';

export const Text = ({
    children,
    variant = 'body1',
    color = 'default',
    as,
    className = '',
    ...props
}: TextProps & ComponentPropsWithoutRef<Tag>) => {
    const Tag = as || VARIANT_MAP[variant];
    const baseStyles = 'font-sans transition-colors duration-200';
    const variantStyle = VARIANT_STYLES[variant];
    const colorStyle = COLOR_STYLES[color];

    return (
        <Tag className={`${baseStyles} ${variantStyle} ${colorStyle} ${className}`} {...props}>
            {children}
        </Tag>
    );
};

const createTextComponent = (variant: Variant) => {
    const Component = (props: Omit<TextProps, 'variant'>) => <Text variant={variant} {...props} />;
    Component.displayName = variant.toUpperCase();
    return Component;
};

export const H1 = createTextComponent('h1');
export const H2 = createTextComponent('h2');
export const H3 = createTextComponent('h3');
export const H4 = createTextComponent('h4');
export const H5 = createTextComponent('h5');
export const H6 = createTextComponent('h6');
export const Body1 = createTextComponent('body1');
export const Body2 = createTextComponent('body2');
export const Caption = createTextComponent('caption');
export const Overline = createTextComponent('overline');
export const Subtitle1 = createTextComponent('subtitle1');
export const Subtitle2 = createTextComponent('subtitle2');
