import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    reactCompiler: true,
    trailingSlash: true,
    skipTrailingSlashRedirect: false,
    basePath: process.env.PUBLIC_URL ?? '',
};

export default nextConfig;
