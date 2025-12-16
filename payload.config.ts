import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  db: mongooseAdapter({
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/perfumaria-golden',
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
          type: 'upload',
          relationTo: 'media',
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
      slug: 'media',
      upload: true,
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
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
