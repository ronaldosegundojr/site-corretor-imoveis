import { CollectionConfig } from 'payload/types';

const Properties = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'status', 'price', 'location'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título do Imóvel',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição Detalhada',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Valor (R$)',
      required: true,
      min: 0,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Tipo de Imóvel',
      options: [
        'Casa',
        'Apartamento',
        'Sobrado',
        'Cobertura',
        'Terreno',
        'Rural',
        'Comercial',
      ],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        'Venda',
        'Aluguel',
        'Vendido',
      ],
      defaultValue: 'Venda',
      required: true,
    },
    {
      name: 'location',
      type: 'group',
      label: 'Localização',
      fields: [
        {
          name: 'city',
          type: 'text',
          label: 'Cidade',
          required: true,
          defaultValue: 'Araraquara',
        },
        {
          name: 'neighborhood',
          type: 'text',
          label: 'Bairro',
          required: true,
        },
        {
          name: 'subdivision',
          type: 'text',
          label: 'Loteamento/Condomínio',
        },
      ],
    },
    {
      name: 'features',
      type: 'group',
      label: 'Características',
      fields: [
        {
          name: 'bedrooms',
          type: 'number',
          label: 'Dormitórios',
          defaultValue: 0,
        },
        {
          name: 'suites',
          type: 'number',
          label: 'Suítes',
          defaultValue: 0,
        },
        {
          name: 'bathrooms',
          type: 'number',
          label: 'Banheiros',
          defaultValue: 1,
        },
        {
          name: 'garages',
          type: 'number',
          label: 'Vagas de Garagem',
          defaultValue: 0,
        },
        {
          name: 'area',
          type: 'number',
          label: 'Área Privativa (m²)',
          required: true,
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Galeria de Fotos',
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'URL da Imagem',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destaque na Página Inicial',
      defaultValue: false,
    },
    {
      name: 'code',
      type: 'text',
      label: 'Código de Referência',
      unique: true,
    },
  ],
};

export default Properties;
