# 🌟 Perfumaria Golden - E-commerce

Site completo de e-commerce para a Perfumaria Golden, especializada em produtos de beleza premium.

## 🎨 Características

- ✅ Catálogo completo de produtos
- ✅ Carrinho de compras funcional
- ✅ Checkout em múltiplas etapas
- ✅ Integração com WhatsApp
- ✅ Sistema administrativo protegido
- ✅ Design responsivo (mobile/desktop)
- ✅ Acessibilidade (VLibras)
- ✅ Busca e filtros de produtos

## 🚀 Tecnologias

- **React** + TypeScript
- **React Router** (navegação)
- **Tailwind CSS** (estilização)
- **Lucide React** (ícones)
- **Context API** (gerenciamento de estado)
- **LocalStorage** (persistência)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/perfumaria-golden.git

# Entre na pasta
cd perfumaria-golden

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

## 🔐 Sistema Administrativo

### **Acesso:**
```
URL: /admin
Usuário: admin
Senha: golden2024
```

⚠️ **IMPORTANTE:** Mude a senha antes de usar em produção!

### **Funcionalidades:**
- CRUD completo de produtos
- Exportar/Importar JSON
- Busca e filtros
- Proteção por autenticação

### **Segurança:**
- Login obrigatório
- Proteção contra força bruta (5 tentativas)
- Bloqueio temporário (15 minutos)
- Sessão com expiração (2 horas)

📚 **Documentação completa:** [ADMIN.md](ADMIN.md)

## 🛠️ Estrutura do Projeto

```
perfumaria-golden/
├── components/          # Componentes reutilizáveis
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── CartSidebar.tsx
│   ├── ProductCard.tsx
│   ├── ProtectedRoute.tsx  # 🔒 Proteção de rotas
│   └── ...
├── contexts/           # Context API
│   └── CartContext.tsx
├── data/              # Dados
│   └── products.json  # Catálogo de produtos
├── hooks/             # Custom hooks
│   └── useCart.ts
├── pages/             # Páginas
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── Cart.tsx
│   ├── Admin.tsx      # 🔒 Área administrativa
│   └── ...
├── utils/             # Utilitários
│   └── whatsapp.ts
└── ...
```

## 🎯 Páginas

- `/` - Home (carousels, hero, features)
- `/products` - Catálogo completo
- `/cart` - Carrinho de compras
- `/delivery` - Dados de entrega
- `/payment` - Dados de pagamento
- `/admin` - 🔒 Sistema administrativo (protegido)

## 🔒 Configurar Senha do Admin

### **Opção 1: Código (Rápido)**
Edite `components/ProtectedRoute.tsx`:
```typescript
const ADMIN_USERNAME = 'seu_usuario';
const ADMIN_PASSWORD = 'sua_senha_forte';
```

### **Opção 2: Variáveis de Ambiente (Recomendado)**
1. Crie `.env`:
   ```env
   REACT_APP_ADMIN_USERNAME=seu_usuario
   REACT_APP_ADMIN_PASSWORD=sua_senha_forte
   ```

2. Configure na Vercel (Settings → Environment Variables)

## 📱 WhatsApp

Configure o número em:
- `utils/whatsapp.ts` (linha 7)
- `components/Footer.tsx` (linha 32)

Número atual: `(16) 99732-0195`

## 🎨 Personalização

### **Cores (Paleta Golden):**
```css
--color-golden-dark: #1a1410;
--color-golden-brown: #3d2817;
--color-golden-primary: #c9a961;
--color-golden-light: #e8d5b7;
--color-golden-cream: #f5efe6;
```

### **Fontes:**
- **Títulos:** Playfair Display (serif)
- **Corpo:** Inter (sans-serif)

## 🚀 Deploy

### **Vercel (Recomendado):**
```bash
# Instale Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Ou conecte com GitHub para deploy automático.

📚 **Guia completo:** [DEPLOY.md](DEPLOY.md)

## 📊 Gerenciar Produtos

1. Acesse `/admin`
2. Faça login
3. Crie/edite/exclua produtos
4. Exporte JSON
5. Substitua `data/products.json`
6. Commit e push

## 🔐 Segurança

### **Implementado:**
- ✅ Autenticação no admin
- ✅ Proteção contra força bruta
- ✅ Sessão com expiração
- ✅ Bloqueio temporário

### **Limitações (Frontend Only):**
- ⚠️ Credenciais no código
- ⚠️ Sem backend real
- ⚠️ Usuários técnicos podem contornar

### **Para Produção Real:**
Considere:
- Backend com API
- Banco de dados
- JWT tokens
- Hash de senhas (bcrypt)
- 2FA

## 📝 Scripts

```bash
npm start          # Desenvolvimento
npm run build      # Build para produção
npm test           # Testes
npm run deploy     # Deploy (se configurado)
```

## 🐛 Problemas Comuns

### **Admin bloqueado:**
```javascript
localStorage.removeItem('admin_lockout');
```

### **Sessão expirada:**
Faça login novamente (sessão dura 2 horas)

### **Produtos não aparecem:**
Verifique `data/products.json`

## 📚 Documentação

- [ADMIN.md](ADMIN.md) - Sistema administrativo
- [DEPLOY.md](DEPLOY.md) - Guia de deploy
- [PRODUTOS.md](PRODUTOS.md) - Gerenciar produtos

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e pertence à Perfumaria Golden.

## 📞 Contato

- **WhatsApp:** (16) 99732-0195
- **Site:** [perfumariagolden.com.br](#)

---

**Desenvolvido com ❤️ para Perfumaria Golden**