import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const start = async () => {
  const app = express();

  // Initialize Payload with Express app
  await payload.init({
    express: app,
    config: {
      secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
      db: sqliteAdapter({
        client: {
          url: process.env.DATABASE_URL || 'file:./payload.db',
        },
      }),
      editor: lexicalEditor(),
      collections: [
        {
          slug: 'products',
          admin: {
            useAsTitle: 'name',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
            },
            {
              name: 'price',
              type: 'number',
              required: true,
              min: 0,
            },
            {
              name: 'image',
              type: 'text',
              required: true,
            },
            {
              name: 'available',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'outOfStock',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'showWhenOutOfStock',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'category',
              type: 'select',
              options: [
                'Perfumes',
                'Cabelos',
                'Unhas',
                'Pele',
                'Maquiagem',
              ],
              required: true,
            },
            {
              name: 'bestseller',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          slug: 'users',
          auth: true,
          fields: [
            {
              name: 'firstName',
              type: 'text',
            },
            {
              name: 'lastName',
              type: 'text',
            },
          ],
        },
      ],
      typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
      },
      admin: {
        user: 'users',
      },
      blocks: [],
      globals: [],
      kv: {
        init: () => ({
          get: async () => null,
          set: async () => {},
          delete: async () => {},
        }),
      },
    },
  });

  // Redirect root to Admin panel
  app.get('/', (_, res) => {
    res.redirect('/admin');
  });

  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Payload Server running on http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
  });
};

start();