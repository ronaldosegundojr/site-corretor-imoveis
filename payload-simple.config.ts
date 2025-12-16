import { buildConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  db: {
    adapter: {
      close: async () => {},
      init: async () => {},
    },
  },
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
          name: 'available',
          type: 'checkbox',
          defaultValue: true,
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
});