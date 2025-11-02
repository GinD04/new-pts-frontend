import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    output: 'export',
    distDir: 'dist',
    trailingSlash: true,
    skipTrailingSlashRedirect: false,
    basePath: process.env.PUBLIC_URL ?? '',
};

export default nextConfig;
