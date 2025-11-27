
# 🚀 Guia de Deploy - Perfumaria Golden

Este guia explica como fazer o deploy do site da Perfumaria Golden em diferentes plataformas.

## 📋 Pré-requisitos

Antes de fazer o deploy, certifique-se de que:
- ✅ O site está funcionando localmente (`npm start`)
- ✅ Todos os produtos estão cadastrados em `data/products.json`
- ✅ O número do WhatsApp está correto em `utils/whatsapp.ts` e `components/Footer.tsx`
- ✅ O logo está carregando corretamente

## 🎯 Opções de Deploy (Recomendadas)

### 1️⃣ Vercel (Recomendado - Mais Fácil)

**Vantagens:**
- ✅ Deploy automático a cada commit
- ✅ HTTPS gratuito
- ✅ CDN global
- ✅ Domínio gratuito (.vercel.app)
- ✅ Integração com GitHub

**Passo a passo:**

1. **Crie uma conta no Vercel**
   - Acesse: https://vercel.com
   - Faça login com GitHub

2. **Prepare o projeto**
   ```bash
   # Certifique-se de que está na pasta do projeto
   npm install
   npm run build
   ```

3. **Deploy via GitHub (Recomendado)**
   
   a. Crie um repositório no GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Perfumaria Golden"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/perfumaria-golden.git
   git push -u origin main
   ```

   b. No Vercel:
   - Clique em "New Project"
   - Importe seu repositório do GitHub
   - Configure:
     - Framework Preset: **Create React App**
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Clique em "Deploy"

4. **Deploy via CLI (Alternativa)**
   ```bash
   # Instale o Vercel CLI
   npm install -g vercel

   # Faça login
   vercel login

   # Deploy
   vercel

   # Para deploy em produção
   vercel --prod
   ```

5. **Seu site estará disponível em:**
   ```
   https://perfumaria-golden.vercel.app
   ```

---

### 2️⃣ Netlify

**Vantagens:**
- ✅ Interface amigável
- ✅ Deploy automático
- ✅ HTTPS gratuito
- ✅ Formulários integrados

**Passo a passo:**

1. **Crie uma conta no Netlify**
   - Acesse: https://netlify.com
   - Faça login com GitHub

2. **Deploy via GitHub**
   
   a. Suba o código para GitHub (mesmo processo do Vercel)
   
   b. No Netlify:
   - Clique em "Add new site" → "Import an existing project"
   - Conecte com GitHub
   - Selecione o repositório
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Clique em "Deploy site"

3. **Deploy via Drag & Drop (Mais Rápido)**
   ```bash
   # Faça o build
   npm run build

   # No Netlify, arraste a pasta 'build' para a área de drop
   ```

4. **Seu site estará disponível em:**
   ```
   https://perfumaria-golden.netlify.app
   ```

---

### 3️⃣ GitHub Pages

**Vantagens:**
- ✅ Gratuito
- ✅ Integrado com GitHub
- ✅ Simples de configurar

**Passo a passo:**

1. **Instale o pacote gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Adicione scripts no package.json**
   ```json
   {
     "homepage": "https://seu-usuario.github.io/perfumaria-golden",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Faça o deploy**
   ```bash
   npm run deploy
   ```

4. **Configure o GitHub Pages**
   - Vá em Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Salve

5. **Seu site estará disponível em:**
   ```
   https://seu-usuario.github.io/perfumaria-golden
   ```

---

### 4️⃣ Hostinger / cPanel (Hospedagem Tradicional)

**Para quem já tem hospedagem:**

1. **Faça o build**
   ```bash
   npm run build
   ```

2. **Faça upload via FTP**
   - Conecte-se ao FTP da sua hospedagem
   - Faça upload de **todos os arquivos** da pasta `build/`
   - Coloque na pasta `public_html` ou `www`

3. **Configure o .htaccess** (para React Router funcionar)
   
   Crie um arquivo `.htaccess` na raiz:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## 🔧 Configurações Importantes

### Variáveis de Ambiente

Se precisar de variáveis de ambiente, crie um arquivo `.env`:

```env
REACT_APP_WHATSAPP_NUMBER=5516997320195
REACT_APP_SITE_NAME=Perfumaria Golden
```

E use no código:
```javascript
const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
```

### Domínio Personalizado

**Vercel:**
1. Vá em Settings → Domains
2. Adicione seu domínio
3. Configure os DNS conforme instruções

**Netlify:**
1. Vá em Domain settings
2. Adicione custom domain
3. Configure os DNS

---

## 📱 Checklist Pós-Deploy

Após o deploy, verifique:

- [ ] Site carrega corretamente
- [ ] Logo aparece no header
- [ ] Produtos aparecem nos carousels
- [ ] Busca funciona
- [ ] Adicionar ao carrinho funciona
- [ ] Carrinho lateral abre
- [ ] Fluxo de checkout completo funciona
- [ ] Mensagem WhatsApp é gerada corretamente
- [ ] Links do WhatsApp funcionam
- [ ] VLibras aparece no footer
- [ ] Site é responsivo (mobile/desktop)
- [ ] Todas as páginas carregam (Home, Products, Cart, Delivery, Payment)

---

## 🐛 Problemas Comuns

### Página em branco após deploy

**Solução:** Verifique o `homepage` no `package.json`

Para Vercel/Netlify (raiz do domínio):
```json
{
  "homepage": "."
}
```

Para GitHub Pages (subpasta):
```json
{
  "homepage": "https://seu-usuario.github.io/perfumaria-golden"
}
```

### Rotas não funcionam (404)

**Solução:** Configure redirecionamento para SPA

**Vercel:** Crie `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Netlify:** Crie `public/_redirects`:
```
/*    /index.html   200
```

### Imagens não carregam

**Solução:** Use URLs absolutas ou importe as imagens:
```javascript
import logo from './assets/logo.png';
```

---

## 🎨 Otimizações Recomendadas

### 1. Comprimir Imagens
- Use TinyPNG ou Squoosh
- Converta para WebP quando possível

### 2. Lazy Loading
Já implementado nos ProductCards:
```jsx
<img loading="lazy" ... />
```

### 3. Cache de Produtos
Os produtos já são salvos no localStorage

### 4. Analytics (Opcional)
Adicione Google Analytics para monitorar acessos

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs de build na plataforma
2. Teste localmente com `npm run build` e `npx serve -s build`
3. Consulte a documentação da plataforma escolhida

---

## 🎉 Pronto!

Seu site da Perfumaria Golden está no ar! 🌟

**Próximos passos:**
1. Compartilhe o link com seus clientes
2. Adicione o link nas redes sociais
3. Configure um domínio personalizado (opcional)
4. Monitore os acessos e vendas

---

**Desenvolvido com ❤️ para Perfumaria Golden**
