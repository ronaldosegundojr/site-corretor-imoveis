# 🧹 Guia de Deploy Gratuito e Baixo Custo para Backend

## 📋 Sistema Backend Atual
- **Tecnologia**: Node.js + Express
- **Banco**: JSON com persistência
- **Features**: CRUD completo, autenticação JWT, upload de imagens

---

## 🆓 Opções de Deploy Gratuito

### 1️⃣ **VPS Ubuntu (Grátis)**
**Fornecedor**: AWS Free Tier, Oracle Cloud, DigitalOcean
**Custo**: Grátis
**Plano Básico:**
- 1 vCPU, 512MB RAM
- 25GB armazenamento
- Largura de banda ilimitada

**Setup:**
```bash
# Instalar Node.js 18+ (pode usar versão LTS mais recente)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash
sudo apt install nodejs npm

# Clonar repositório
git clone https://github.com/ronaldosegundojr/Perfumaria-Golden-Frontend.git
cd perfumaria-golden-frontend

# Instalar dependências do backend
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Iniciar serviço
npm start
```

**Prós:**
- Configurar proxy reverso (Nginx)
- Instalar PM2 para gerenciamento
- Configurar certificado SSL (Let's Encrypt)

---

### 2️⃣ **Cloud Run (Minifre)**
**Fornecedor**: Railway, Render, Fly.io
**Custo**: Gratuito com limites
**Planos:** 
- **Free**: 512MB RAM, 1GB storage
- **Hobby**: $7/mês, 2GB storage
- **Starter**: $20/mês, 5GB storage
- **Pro**: $50/mês, 100GB storage

**Deploy Automático:**
```bash
# Conectar repositório GitHub
# Railway: npx railway login
git clone https://github.com/ronaldosegundojr/Perfumaria-Golden-Frontend.git

# Deploy
npx railway deploy
```

---

### 3️⃣ **Render (Backend Free)**
**Custo**: Gratuito com plano Free
**Plano Free:**
- 750h/mês de sleep (inativo = free)
- 256MB RAM
- Build: 15min por build
- Git-backed

**Setup:**
```bash
# Conectar repositório ao Render
# Site: dashboard.render.com
# Repo: https://github.com/ronaldosegundojr/Perfumaria-Golden-Frontend.git

# Configurar
# Criear Web Service
# Configurar Build Command
# Definir variáveis de ambiente
# Deploy automatico ao fazer push
```

---

### 4️⃣ **Supabase (Banco de Dados Gratuito)**
**Custo:** Grátis com limites
**Planos:**
- **Free**: 500MB database, 100MB file size
- **Pro**: $9/mês, 4GB database
- **Scale**: $27/mês, 40GB database

**Como Backend:**
```javascript
// Em server.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
  {
    auth: {
      persistSession: true
      autoRefreshToken: true
      detectSessionInUrl: true
    },
    db: {
      schema: 'public',
      tables: {
        products: {
          columns: {
            id: 'uuid primary key default uuid_generate_v4()',
            name: 'text',
            price: 'numeric',
            created_at: 'timestamp default now()',
            updated_at: 'timestamp default now()'
          }
        }
      }
    }
  }
  }
);
```

---

## 🔧 **Scripts de Deploy Automatizado**

### Para GitHub Actions (Grátis):
```yaml
# .github/workflows/deploy.yml
name: Deploy Backend
on:
  push:
    branches: [ main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
```

### Para Railway (Grátis):
```yaml
# .github/workflows/deploy.yml
name: Deploy Backend
on:
  push:
    branches: [ main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: railway-apps/action-deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
        service-name: perfumaria-backend
```

---

## 📁 **Teste de Deploy Local**

```bash
# Testar build
npm run build

# Testar API
node test-api.js

# Verificar se está rodando
curl http://localhost:3001/api/health
```

---

## 🌐 **Configuração de Produção**

### 1️⃣ **Variáveis de Ambiente (.env)**
```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://seu-dominio.com
JWT_SECRET=super-secret-key-mudar-em-producao
ALLOWED_ORIGINS=https://localhost:5173,https://seu-dominio.com
```

### 2️⃣ **Segurança Adicional**
```javascript
// Em production:
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // requisições por janela
  standardHeaders: true,
  message: 'Muitas tentativas. Tente novamente mais tarde.'
}));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${req.ip} - Status: ${res.statusCode}`);
  next();
});
```

### 3️⃣ **Performance**
```javascript
// Cache para leituras frequentes
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutos

app.get('/api/products', cacheMiddleware, (req, res) => {
  // Cache GET requests por 10 minutos
});
```

---

## 🚀 **Escalabilidade**

### Fases de Crescimento:

**Fase 1: Launch (0-100 clientes/mês)**
- **Frontend**: Vercel Free ($0)
- **Backend**: Railway Free ($7/mês)
- **Custo Total**: $7/mês

**Fase 2: Crescimento (100-1000 clientes/mês)**
- **Frontend**: Vercel Pro ($20/mês)
- **Backend**: Railway Pro ($25/mês)
- **Database**: Supabase Pro ($9/mês)
- **Custo Total**: $54/mês

**Fase 3: Estabilização (1000+ clientes/mês)**
- **Frontend**: Vercel Pro ($20/mês)  
- **Backend**: AWS Lightsail (~$30/mês)
- **Database**: Supabase Pro ($9/mês)
- **CDN**: Cloudflare (pago pelo uso)
- **Custo Total**: ~$59/mês

---

## 💰 **Monitoramento**

### Ferramentas Gratuitas:
- **Vercel Analytics**: Performance, tráfego, conversões
- **UptimeRobot**: Monitoramento 24/7
- **GitHub Status**: Status do servidor
- **Pingdom**: Monitoramento de uptime e performance
- **SpeedCurve**: Análise de performance do frontend

### Métricas Importantes:
- **Tempo de Primeiro Byte**: < 2s
- **Time to Interactive**: < 100ms
- **Core Web Vitals**: LCP, FID, CLS, FCP
- **Uptime**: 99.9%+

---

## 🔧 **Scripts de Deploy**

### Automatização Completa:
```bash
# deploy.sh
#!/bin/bash

echo "🚀 Iniciando deploy..."

# Fazer backup dos dados
if [ -d "data/products.json" ]; then
  cp data/products.json "backup/products-$(date +%Y%m%d_%H%M%S).json"
fi

# Build e deploy
npm run build
git add .
git commit -m "Deploy: $(date)"
git push origin main

echo "✅ Deploy concluído!"
echo "🔗 URL: https://seu-dominio.com"
echo "📊 Logs: Vercel Dashboard > perfumaria-golden-mvp"
```

---

## 📋 **Suporte Gratuito**

- **Vercel**: Suporte 24/7 por chat
- **GitHub Issues**: Track de issues via Pull Requests
- **Comunidade**: Discord/Slack para suporte técnico
- **Documentação**: GitHub Wiki com guias completos

---

## 🎯 **Considerações Finais**

### Legislação:
- **LGPD**: Lei Geral de Proteção de Dados
- **API Compliance**: Verificar se precisa de LGPD para o backend
- **PCI DSS**: Se lidar com pagamentos, seguir padrões PCI DSS
- **Segurança**: Configurar políticas de segurança reforçadas

### Performance:
- **Imagens**: Usar CDN para otimizar carregamento
- **Cache**: Implementar cache inteligente
- **Minimização**: Minificar JavaScript e CSS
- **Lazy Loading**: Carregar recursos sob demanda

### Monetização:
- **Logs Centrais**: Configurar log streaming
- **Alerting**: Configurar notificações por e-mail/Slack
- **Backup Diário**: Automatizar backups diários
- **Health Checks**: Verificar saúde do sistema regularmente

---

## 🎯 **Caminho Recomendado**

1. **Fase 1**: Deploy Vercel (gratuito, já configurado)
2. **Fase 2**: Testar com usuários reais
3. **Fase 3**: Analisar métricas e otimizar
4. **Fase 4**: Considerar upgrade para plano pago se necessário

**Su MVP está pronto para crescimento sustentável!** 🚀