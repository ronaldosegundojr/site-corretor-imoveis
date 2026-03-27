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

  // Rota para imóveis públicos (compatibilidade com frontend)
  app.get('/api/properties', async (req, res) => {
    try {
      const properties = await payload.find({
        collection: 'properties',
      });
      
      res.json({
        docs: properties.docs,
        totalDocs: properties.totalDocs,
        limit: properties.limit,
        totalPages: properties.totalPages,
        page: properties.page,
        pagingCounter: properties.pagingCounter,
        hasPrevPage: properties.hasPrevPage,
        hasNextPage: properties.hasNextPage,
        prevPage: properties.prevPage,
        nextPage: properties.nextPage
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao carregar imóveis' });
    }
  });

  app.get('/api/properties/:id', async (req, res) => {
    try {
      const property = await payload.findByID({
        collection: 'properties',
        id: req.params.id,
      });
      
      if (!property) {
        return res.status(404).json({ error: 'Imóvel não encontrado' });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao carregar imóvel' });
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