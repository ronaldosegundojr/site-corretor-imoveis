import { CollectionConfig } from 'payload/types';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return user?.role === 'admin';
    },
    update: ({ req: { user } }) => {
      return user?.role === 'admin';
    },
    delete: ({ req: { user } }) => {
      return user?.role === 'admin';
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        'Perfumes Masculinos',
        'Perfumes Femininos',
        'Corpo e Banho',
        'Cuidados com a Pele',
        'Maquiagem',
        'Acessórios',
      ],
      required: true,
    },
    {
      name: 'brand',
      type: 'text',
    },
    {
      name: 'image',
      type: 'text',
    },
    {
      name: 'stock',
      type: 'number',
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
};

export default Products;