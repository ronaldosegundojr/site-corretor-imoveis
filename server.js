import express from 'express';
import { getPayload } from 'payload';
import dotenv from 'dotenv';
import config from './payload-simple.config.ts';

dotenv.config();

const app = express();

const start = async () => {
  const payload = await getPayload({ config });

  app.use(payload.authenticate);

  // Redirect root to Admin panel
  app.get('/', (_, res) => {
    res.redirect('/admin');
  });

  app.listen(process.env.PORT || 3001, async () => {
    console.log(`Payload Server running on http://localhost:${process.env.PORT || 3001}`);
    console.log(`Admin panel: http://localhost:${process.env.PORT || 3001}/admin`);
  });
};

start();