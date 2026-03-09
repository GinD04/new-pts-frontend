import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    distDir: 'dist',
    trailingSlash: true,
    skipTrailingSlashRedirect: false,
    basePath: process.env.PUBLIC_URL ?? '',
};

export default nextConfig;
