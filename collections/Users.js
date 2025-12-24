import { CollectionConfig } from 'payload/types';
import bcrypt from 'bcryptjs';

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') {
        return true;
      }
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    create: () => true,
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') {
        return true;
      }
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    delete: ({ req: { user } }) => {
      if (user?.role === 'admin') {
        return true;
      }
      return false;
    },
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      access: {
        update: ({ req: { user } }) => {
          return user?.role === 'admin';
        },
        create: ({ req: { user } }) => {
          return user?.role === 'admin';
        },
      },
    },
    {
      name: 'phone',
      type: 'text',
    },
  ],
  hooks: {
    beforeChange: [
      async (args) => {
        if (args.operation === 'create' || args.data.password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(args.data.password, salt);
          args.data.password = hashedPassword;
        }
        return args.data;
      },
    ],
  },
};

export default Users;