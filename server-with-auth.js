import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Dados em memória para teste
let products = [
  {
    id: '1',
    name: 'Perfume Teste',
    description: 'Descrição do perfume teste',
    price: 199.90,
    category: 'Perfumes Masculinos',
    image: 'https://images.unsplash.com/photo-1523296848231-263a9c2a7a5a',
    stock: 10,
    featured: true,
    outOfStock: false,
    available: true,
    createdAt: new Date().toISOString()
  }
];

// Usuários em memória (senha: admin123)
const users = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@perfumaria.com',
    role: 'admin',
    password: '$2b$10$/kRxw3/eRGxRtLO0BwWjF.plgFjro2mJrLlntSkI39RlCbGfy24hm' // "admin123"
  },
  {
    id: '2',
    firstName: 'Regular',
    lastName: 'User',
    email: 'user@perfumaria.com',
    role: 'user',
    password: '$2b$10$/kRxw3/eRGxRtLO0BwWjF.plgFjro2mJrLlntSkI39RlCbGfy24hm' // "admin123"
  }
];

const JWT_SECRET = process.env.PAYLOAD_SECRET || 'test-secret-key';

// Middleware de verificação de token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Middleware de verificação de admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Requer role admin.' });
  }
  next();
};

// Rotas da API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend with auth is running' });
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

// Produtos - endpoints protegidos (requer admin)
app.post('/api/products', authenticateToken, requireAdmin, (req, res) => {
  const newProduct = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  console.log('Novo produto adicionado:', newProduct);
  
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', authenticateToken, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  products[index] = { ...products[index], ...req.body };
  console.log('Produto atualizado:', products[index]);
  
  res.json(products[index]);
});

app.delete('/api/products/:id', authenticateToken, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  const deletedProduct = products.splice(index, 1)[0];
  console.log('Produto deletado:', deletedProduct);
  
  res.json({ message: 'Produto deletado com sucesso' });
});

// Página admin simples com validação
app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin Panel - Perfumaria Golden</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .form-group { margin-bottom: 20px; }
            label { display: block; margin-bottom: 5px; font-weight: bold; }
            input, textarea, select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
            button { background: #007bff; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px; }
            button:hover { background: #0056b3; }
            .product-list { margin-top: 30px; }
            .product-item { background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 5px; }
            .btn-danger { background: #dc3545; }
            .btn-danger:hover { background: #c82333; }
            .auth-section { background: #e9ecef; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .hidden { display: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🛍️ Painel Admin - Perfumaria Golden</h1>
            
            <div id="loginSection" class="auth-section">
                <h2>🔐 Login de Acesso</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label>Senha:</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                <p><small>Use: admin@perfumaria.com / admin123</small></p>
            </div>
            
            <div id="adminSection" class="hidden">
                <div class="auth-section">
                    <h3>👤 Bem-vindo, <span id="userEmail"></span>!</h3>
                    <button onclick="logout()">Sair</button>
                </div>
                
                <form id="productForm">
                    <div class="form-group">
                        <label>Nome do Produto:</label>
                        <input type="text" id="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Descrição:</label>
                        <textarea id="description" rows="3" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Preço:</label>
                        <input type="number" id="price" step="0.01" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Categoria:</label>
                        <select id="category" required>
                            <option value="Perfumes Masculinos">Perfumes Masculinos</option>
                            <option value="Perfumes Femininos">Perfumes Femininos</option>
                            <option value="Corpo e Banho">Corpo e Banho</option>
                            <option value="Cuidados com a Pele">Cuidados com a Pele</option>
                            <option value="Maquiagem">Maquiagem</option>
                            <option value="Acessórios">Acessórios</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>URL da Imagem:</label>
                        <input type="url" id="image" placeholder="https://...">
                    </div>
                    
                    <div class="form-group">
                        <label>Estoque:</label>
                        <input type="number" id="stock" value="10" min="0">
                    </div>
                    
                    <button type="submit">Adicionar Produto</button>
                </form>
                
                <div class="product-list">
                    <h2>Produtos Cadastrados</h2>
                    <div id="productsList"></div>
                </div>
            </div>
        </div>

        <script>
            let authToken = localStorage.getItem('authToken');
            let currentUser = null;

            // Verificar autenticação ao carregar
            if (authToken) {
                checkAuth();
            }

            // Login
            document.getElementById('loginForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                console.log('Tentando login com:', email);
                
                try {
                    const response = await fetch('/api/users/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    console.log('Resposta do servidor:', response.status);
                    
                    const data = await response.json();
                    console.log('Dados recebidos:', data);

                    if (response.ok) {
                        authToken = data.token;
                        currentUser = data.user;
                        localStorage.setItem('authToken', authToken);
                        
                        console.log('Login bem-sucedido!');
                        showAdminSection();
                        loadProducts();
                        alert('Login realizado com sucesso!');
                    } else {
                        console.log('Erro no login:', data.error);
                        alert('Credenciais inválidas: ' + (data.error || ''));
                    }
                } catch (error) {
                    console.error('Erro na requisição:', error);
                    alert('Erro ao fazer login: ' + error.message);
                }
            });

            // Verificar autenticação
            async function checkAuth() {
                try {
                    const response = await fetch('/api/users/me', {
                        headers: {
                            'Authorization': 'Bearer ' + authToken,
                        },
                    });

                    if (response.ok) {
                        currentUser = await response.json();
                        showAdminSection();
                        loadProducts();
                    } else {
                        logout();
                    }
                } catch (error) {
                    logout();
                }
            }

            // Mostrar seção admin
            function showAdminSection() {
                document.getElementById('loginSection').classList.add('hidden');
                document.getElementById('adminSection').classList.remove('hidden');
                document.getElementById('userEmail').textContent = currentUser.email;
            }

            // Logout
            function logout() {
                authToken = null;
                currentUser = null;
                localStorage.removeItem('authToken');
                document.getElementById('loginSection').classList.remove('hidden');
                document.getElementById('adminSection').classList.add('hidden');
            }

            // Carregar produtos
            async function loadProducts() {
                try {
                    const response = await fetch('/api/products');
                    const data = await response.json();
                    const productsList = document.getElementById('productsList');
                    
                    productsList.innerHTML = data.docs.map(product => 
                        '<div class="product-item">' +
                            '<h3>' + product.name + '</h3>' +
                            '<p>' + product.description + '</p>' +
                            '<p><strong>Preço:</strong> R$ ' + product.price.toFixed(2) + '</p>' +
                            '<p><strong>Categoria:</strong> ' + product.category + '</p>' +
                            '<p><strong>Estoque:</strong> ' + (product.stock || 0) + '</p>' +
                            '<button onclick="deleteProduct(\'' + product.id + '\')" class="btn-danger">Excluir</button>' +
                        '</div>'
                    ).join('');
                } catch (error) {
                    console.error('Erro ao carregar produtos:', error);
                }
            }

            // Adicionar produto
            document.getElementById('productForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const product = {
                    name: document.getElementById('name').value,
                    description: document.getElementById('description').value,
                    price: parseFloat(document.getElementById('price').value),
                    category: document.getElementById('category').value,
                    image: document.getElementById('image').value || 'https://images.unsplash.com/photo-1523296848231-263a9c2a7a5a',
                    stock: parseInt(document.getElementById('stock').value),
                    featured: false,
                    outOfStock: false,
                    available: true
                };

                try {
                        const response = await fetch('/api/products', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + authToken,
                            },
                        body: JSON.stringify(product),
                    });

                    if (response.ok) {
                        document.getElementById('productForm').reset();
                        loadProducts();
                        alert('Produto adicionado com sucesso!');
                    } else {
                        const error = await response.json();
                        alert('Erro ao adicionar produto: ' + error.error);
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao adicionar produto');
                }
            });

            // Deletar produto
            async function deleteProduct(id) {
                if (confirm('Tem certeza que deseja excluir este produto?')) {
                    try {
                        const response = await fetch('/api/products/' + id, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': 'Bearer ' + authToken,
                            },
                        });

                        if (response.ok) {
                            loadProducts();
                            alert('Produto excluído com sucesso!');
                        } else {
                            const error = await response.json();
                            alert('Erro ao excluir produto: ' + error.error);
                        }
                    } catch (error) {
                        console.error('Erro:', error);
                        alert('Erro ao excluir produto');
                    }
                }
            }
        </script>
    </body>
    </html>
  `);
});

// Redirecionar raiz para admin
app.get('/', (req, res) => {
  res.redirect('/admin');
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`🔗 API endpoints: http://localhost:${PORT}/api`);
  console.log(`👤 Test credentials: admin@perfumaria.com / admin123`);
  console.log(`🛍️ Frontend: http://localhost:5173`);
});