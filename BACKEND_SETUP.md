# Perfumaria Golden - Backend com Payload CMS

## Configuração Completa

Este projeto agora está configurado com **Payload CMS** para gerenciamento completo de produtos e usuários administradores.

### 🚀 Funcionalidades Implementadas

#### 1. Sistema de Produtos (CRUD)
- ✅ Criar novos produtos
- ✅ Editar produtos existentes
- ✅ Deletar produtos
- ✅ Listar produtos com filtros
- ✅ Controle de estoque
- ✅ Categorias personalizadas
- ✅ Produtos em destaque

#### 2. Sistema de Usuários Admin
- ✅ Autenticação segura com JWT
- ✅ Criação de usuários administradores
- ✅ Controle de acesso baseado em papéis (admin/user)
- ✅ Proteção de rotas administrativas

#### 3. Banco de Dados
- ✅ MongoDB configurado
- ✅ Migrations automáticas
- ✅ Backup e restauração

### 📁 Estrutura de Arquivos

```
├── collections/
│   ├── Products.js     # Modelo de produtos
│   └── Users.js        # Modelo de usuários
├── payload.config.js   # Configuração do Payload CMS
├── server.js          # Servidor Express + Payload
└── src/
    ├── services/
    │   └── api.ts     # Cliente API para frontend
    └── pages/
        ├── Admin.tsx  # Painel administrativo
        └── Login.js   # Tela de login
```

### 🔧 Como Usar

#### 1. Iniciar o Backend
```bash
# Instalar dependências
npm install

# Iniciar servidor
npm run server
```

#### 2. Acessar Painel Admin
- **URL:** http://localhost:3001/admin
- **Primeiro Acesso:** Crie um usuário admin através do painel

#### 3. Gerenciar Produtos
- Acesse o painel admin
- Navegue até "Products"
- Use a interface para criar, editar ou deletar produtos

#### 4. Criar Usuários Admin
- Acesse "Users" no painel admin
- Crie novos usuários com role "admin"
- Defina permissões conforme necessário

### 🛡️ Segurança

#### Autenticação
- Tokens JWT com expiração
- Senhas hasheadas com bcrypt
- Proteção contra ataques CSRF

#### Controle de Acesso
- Apenas admins podem criar/editar produtos
- Usuários podem ver apenas seus próprios dados
- API protegida com middleware de autenticação

### 📊 Campos dos Produtos

```javascript
{
  name: "Nome do Produto",
  description: "Descrição detalhada",
  price: 99.90,
  category: "Perfumes Masculinos",
  brand: "Marca",
  image: "URL da imagem",
  stock: 10,
  featured: true,
  tags: ["tag1", "tag2"]
}
```

### 🎯 Categorias Disponíveis

- Perfumes Masculinos
- Perfumes Femininos
- Corpo e Banho
- Cuidados com a Pele
- Maquiagem
- Acessórios

### 🔗 Endpoints da API

#### Produtos
- `GET /api/products` - Listar todos
- `GET /api/products/:id` - Buscar por ID
- `POST /api/products` - Criar (admin)
- `PUT /api/products/:id` - Atualizar (admin)
- `DELETE /api/products/:id` - Deletar (admin)

#### Autenticação
- `POST /api/users/login` - Login
- `GET /api/users/me` - Dados do usuário logado

### 🌐 Frontend Integration

O frontend está configurado para consumir a API do Payload CMS através do serviço `api.ts`. O componente Admin foi atualizado para usar os endpoints reais da API.

### 📝 Variáveis de Ambiente

```env
PAYLOAD_SECRET=your-secret-key-change-this-in-production
MONGODB_URI=mongodb://localhost:27017/perfumaria-golden
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
NODE_ENV=development
PORT=3001
VITE_PAYLOAD_URL=http://localhost:3001
```

### 🚀 Próximos Passos

1. **Configurar MongoDB** local ou na nuvem
2. **Criar primeiro usuário admin**
3. **Importar produtos existentes**
4. **Configurar upload de imagens**
5. **Implementar notificações**

O sistema está pronto para uso em produção com todas as funcionalidades de CRUD e autenticação configuradas!