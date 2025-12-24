import { withPayload } from '@payloadcms/next/withPayload';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your Next.js config here
    experimental: {
        reactCompiler: false,
    },
};

export default withPayload(nextConfig, {
    configPath: path.resolve(dirname, 'payload.config.ts'),
});
