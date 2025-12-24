import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import payload from 'payload';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar Payload CMS
const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-this-in-production',
    express: app,
    configPath: './payload.config.js',
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running with Payload CMS' });
  });

  // Rota para produtos públicos (compatibilidade com frontend)
  app.get('/api/products', async (req, res) => {
    try {
      const products = await payload.find({
        collection: 'products',
      });
      
      res.json({
        docs: products.docs,
        totalDocs: products.totalDocs,
        limit: products.limit,
        totalPages: products.totalPages,
        page: products.page,
        pagingCounter: products.pagingCounter,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao carregar produtos' });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await payload.findByID({
        collection: 'products',
        id: req.params.id,
      });
      
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao carregar produto' });
    }
  });

  // Redirecionar raiz para admin
  app.get('/', (req, res) => {
    res.redirect(payload.getAdminURL());
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Payload Admin: http://localhost:${PORT}${payload.getAdminURL()}`);
    console.log(`🔗 API endpoints: http://localhost:${PORT}/api`);
  });
};

start();