export const VARIANT_STYLES = {
    h1: 'text-5xl md:text-6xl font-bold tracking-tight leading-tight',
    h2: 'text-4xl md:text-5xl font-bold tracking-tight leading-tight',
    h3: 'text-3xl md:text-4xl font-bold leading-tight',
    h4: 'text-2xl md:text-3xl font-semibold leading-snug',
    h5: 'text-xl md:text-2xl font-semibold leading-snug',
    h6: 'text-lg md:text-xl font-semibold leading-normal',
    subtitle1: 'text-lg font-medium leading-relaxed',
    subtitle2: 'text-base font-medium leading-relaxed',
    body1: 'text-base font-normal leading-normal',
    body2: 'text-sm font-normal leading-normal',
    caption: 'text-xs font-normal leading-tight',
    overline: 'text-xs font-medium uppercase tracking-wider leading-none',
} as const;

export const COLOR_STYLES = {
    default: 'text-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    error: 'text-danger',
    warning: 'text-warning',
} as const;
