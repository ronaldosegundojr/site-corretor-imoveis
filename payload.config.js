import { buildConfig } from 'payload/config';
import path from 'path';
import Properties from './collections/Properties.js';
import Users from './collections/Users.js';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    user: Users.slug,
  },
  collections: [
    Properties,
    Users,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: {
    adapter: require('@payloadcms/db-mongodb').mongooseAdapter({
      url: process.env.MONGODB_URI || 'mongodb://localhost:27017/seu-broker-imoveis',
    }),
  },
});