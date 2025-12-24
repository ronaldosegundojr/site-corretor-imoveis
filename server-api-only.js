import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { loadProducts, saveProducts } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'product-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// Servir arquivos estáticos (incluindo uploads)
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));
app.use(express.static(path.join(process.cwd(), 'public')));

// Carregar produtos do arquivo (persistência real)
let products = loadProducts();

// Categorias disponíveis
let categories = [
  'Perfumes Masculinos',
  'Perfumes Femininos', 
  'Cabelos',
  'Maquiagem',
  'Cuidados com a Pele'
];

// Usuários em memória
const users = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@perfumaria.com',
    role: 'admin',
    password: '$2b$10$/kRxw3/eRGxRtLO0BwWjF.plgFjro2mJrLlntSkI39RlCbGfy24hm' // "admin123"
  }
];

const JWT_SECRET = process.env.PAYLOAD_SECRET || 'test-secret-key';

// Middleware de verificação de token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Auth header:', authHeader);
  
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token extraído:', token ? token.substring(0, 50) + '...' : 'null');

  if (!token) {
    console.log('❌ Token não fornecido');
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('❌ Token inválido:', err.message);
      return res.status(403).json({ error: 'Token inválido' });
    }
    console.log('✅ Token válido, usuário:', user);
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Requer role admin.' });
  }
  next();
};

// Rotas da API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend API is running' });
});

// Upload de imagem
app.post('/api/upload', authenticateToken, requireAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      message: 'Imagem uploaded com sucesso',
      url: imageUrl,
      filename: req.file.filename,
      originalName: req.file.originalname
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
  }
});

// Autenticação
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  });
});

app.get('/api/users/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  });
});

// Categorias - endpoint público
app.get('/api/categories', (req, res) => {
  res.json({
    docs: categories.map(cat => ({ name: cat })),
    totalDocs: categories.length
  });
});

// Produtos - endpoints públicos
app.get('/api/products', (req, res) => {
  res.json({
    docs: products,
    totalDocs: products.length,
    limit: products.length,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  res.json(product);
});

// Categorias - endpoints protegidos
app.post('/api/categories', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Nome da categoria é obrigatório' });
    }
    
    const normalizedName = name.trim();
    
    // Verificar se categoria já existe
    if (categories.includes(normalizedName)) {
      return res.status(400).json({ error: 'Esta categoria já existe' });
    }
    
    categories.push(normalizedName);
    console.log('Nova categoria adicionada:', normalizedName);
    
    res.status(201).json({ 
      name: normalizedName,
      message: 'Categoria criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro interno ao criar categoria' });
  }
});

// Usuários - endpoints protegidos  
app.post('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { firstName, lastName, email, password, role = 'user' } = req.body;
    
    // Validações
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    // Verificar se email já existe
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Este email já está cadastrado' });
    }
    
    // Gerar hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword
    };
    
    users.push(newUser);
    console.log('Novo usuário criado:', { ...newUser, password: '[HASHED]' });
    
    res.status(201).json({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
      message: 'Usuário criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao criar usuário' });
  }
});

app.get('/api/users', authenticateToken, requireAdmin, (req, res) => {
  try {
    const usersList = users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }));
    
    res.json({
      docs: usersList,
      totalDocs: usersList.length
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro interno ao listar usuários' });
  }
});

// Produtos - endpoints protegidos
app.post('/api/products', authenticateToken, requireAdmin, (req, res) => {
  console.log('=== POST /api/products ===');
  console.log('Usuário autenticado:', req.user);
  console.log('Dados recebidos:', req.body);
  
  try {
    const newProduct = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    saveProducts(products); // Salvar no arquivo
    console.log('Novo produto adicionado com sucesso:', newProduct);
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro interno ao criar produto' });
  }
});

app.put('/api/products/:id', authenticateToken, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
      products[index] = { ...products[index], ...req.body };
      saveProducts(products); // Salvar no arquivo
      console.log('Produto atualizado:', products[index]);
      
      res.json(products[index]);
});

app.delete('/api/products/:id', authenticateToken, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
      const deletedProduct = products.splice(index, 1)[0];
      saveProducts(products); // Salvar no arquivo
      console.log('Produto deletado:', deletedProduct);
      
      res.json({ message: 'Produto deletado com sucesso' });
});

// Redirecionar raiz para frontend
app.get('/', (req, res) => {
  res.redirect('http://localhost:5173');
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend API server running on http://localhost:${PORT}`);
  console.log(`🔗 API endpoints: http://localhost:${PORT}/api`);
  console.log(`👤 Test credentials: admin@perfumaria.com / admin123`);
  console.log(`🛍️ Frontend: http://localhost:5173`);
  console.log(`🔐 Frontend Admin: http://localhost:5173/admin`);
});