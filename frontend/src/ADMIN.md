# 🛠️ Guia do Sistema Administrativo

Sistema de gerenciamento de produtos da Perfumaria Golden.

## 🔐 Acesso e Segurança

### **Credenciais Padrão:**
```
Usuário: admin
Senha: golden2024
```

⚠️ **IMPORTANTE:** Mude a senha antes de usar em produção!

### **URL de Acesso:**
- **Desenvolvimento:** `http://localhost:3000/admin`
- **Produção:** `https://seu-site.vercel.app/admin`

### **Recursos de Segurança:**

#### **1. Autenticação Obrigatória** 🔒
- Login com usuário e senha
- Credenciais validadas antes do acesso
- Sessão expira em 2 horas

#### **2. Proteção contra Força Bruta** 🛡️
- Máximo de 5 tentativas incorretas
- Bloqueio automático por 15 minutos após 5 falhas
- Contador de tentativas visível

#### **3. Gerenciamento de Sessão** ⏱️
- Token armazenado no localStorage
- Sessão expira automaticamente após 2 horas
- Logout manual disponível (botão "Sair")

#### **4. Validações** ✅
- Campos obrigatórios no login
- Verificação de expiração de sessão
- Redirecionamento automático se não autenticado

## 🔧 Configuração de Segurança

### **Opção 1: Alterar Senha no Código (Rápido)**

Edite `components/ProtectedRoute.tsx`:

```typescript
// Linha ~21-22
const ADMIN_USERNAME = 'seu_usuario';
const ADMIN_PASSWORD = 'sua_senha_forte_aqui';
```

### **Opção 2: Usar Variáveis de Ambiente (Recomendado)**

1. **Crie arquivo `.env` na raiz:**
   ```env
   REACT_APP_ADMIN_USERNAME=seu_usuario
   REACT_APP_ADMIN_PASSWORD=sua_senha_forte
   ```

2. **Atualize `ProtectedRoute.tsx`:**
   ```typescript
   const ADMIN_USERNAME = process.env.REACT_APP_ADMIN_USERNAME || 'admin';
   const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'golden2024';
   ```

3. **Configure na Vercel:**
   - Vá em Settings → Environment Variables
   - Adicione:
     - `REACT_APP_ADMIN_USERNAME` = seu_usuario
     - `REACT_APP_ADMIN_PASSWORD` = sua_senha_forte
   - Faça redeploy

### **Opção 3: Senha Forte Recomendada** 🔐

Use um gerador de senhas para criar algo como:
```
G0ld3n!P3rfum@r1a#2024$S3cur3
```

## 🚪 Como Fazer Login

1. **Acesse:** `/admin`
2. **Digite usuário e senha**
3. **Clique em "Entrar"**
4. **Sessão válida por 2 horas**

## 🚪 Como Fazer Logout

- Clique no botão **"🚪 Sair"** no canto superior direito
- Ou aguarde 2 horas (logout automático)

## ⚠️ Bloqueio por Tentativas

Se errar a senha 5 vezes:
- ❌ Bloqueio automático por 15 minutos
- ⏱️ Contador regressivo exibido
- 🔓 Desbloqueio automático após 15 minutos

## 🔒 Recursos de Segurança Implementados

### **Frontend:**
- ✅ Autenticação com usuário/senha
- ✅ Proteção contra força bruta (5 tentativas)
- ✅ Bloqueio temporário (15 minutos)
- ✅ Sessão com expiração (2 horas)
- ✅ Token no localStorage
- ✅ Logout manual
- ✅ Verificação de sessão expirada
- ✅ Redirecionamento automático

### **Limitações (Frontend Only):**
⚠️ Este é um sistema de proteção **básico** no frontend:
- Credenciais estão no código (podem ser vistas)
- Não há backend para validação real
- Usuários técnicos podem contornar

### **Para Segurança Real (Produção):**
Considere implementar:
1. **Backend com API** (Node.js, Python, etc.)
2. **Banco de dados** para credenciais
3. **JWT tokens** reais
4. **Hash de senhas** (bcrypt)
5. **Rate limiting** no servidor
6. **2FA** (autenticação de dois fatores)

## 📊 Informações de Sessão

### **Duração:**
- **Sessão ativa:** 2 horas
- **Bloqueio:** 15 minutos (após 5 tentativas)

### **Armazenamento:**
- `perfumaria_golden_admin_auth` - Token de autenticação
- `perfumaria_golden_admin_expiry` - Timestamp de expiração
- `admin_lockout` - Timestamp de bloqueio (se houver)

## 🎯 Fluxo de Autenticação

```
┌─────────────────┐
│ Acessa /admin   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Tem sessão      │
│ válida?         │
└────┬───────┬────┘
     │       │
    Sim     Não
     │       │
     ▼       ▼
┌─────┐  ┌──────────┐
│Admin│  │Tela Login│
│Panel│  └─────┬────┘
└─────┘        │
               ▼
        ┌──────────────┐
        │ Credenciais  │
        │ corretas?    │
        └──┬───────┬───┘
           │       │
          Sim     Não
           │       │
           ▼       ▼
        ┌─────┐ ┌──────┐
        │Admin│ │Erro  │
        │Panel│ │+1    │
        └─────┘ └──────┘
                   │
                   ▼
                ┌──────┐
                │5 erros?│
                └──┬──┬──┘
                   │  │
                  Sim Não
                   │  │
                   ▼  ▼
              ┌─────┐ ┌────┐
              │Block│ │Retry│
              │15min│ └────┘
              └─────┘
```

## 🔍 Verificação de Segurança

### **Teste a Proteção:**

1. **Acesse `/admin` sem login:**
   - ✅ Deve mostrar tela de login

2. **Tente senha errada 5 vezes:**
   - ✅ Deve bloquear por 15 minutos

3. **Faça login correto:**
   - ✅ Deve acessar admin panel

4. **Aguarde 2 horas:**
   - ✅ Sessão deve expirar

5. **Clique em "Sair":**
   - ✅ Deve fazer logout imediato

## 📝 Logs de Segurança

O sistema registra no localStorage:
- Tentativas de login
- Timestamp de bloqueio
- Token de sessão
- Expiração de sessão

## 🆘 Problemas Comuns

### **Esqueci a senha:**
- Edite `components/ProtectedRoute.tsx`
- Ou configure variáveis de ambiente

### **Bloqueado por 15 minutos:**
- Aguarde o tempo ou limpe localStorage:
  ```javascript
  localStorage.removeItem('admin_lockout');
  ```

### **Sessão expirou:**
- Faça login novamente
- Sessão dura 2 horas

## ✨ Funcionalidades do Admin

Após autenticado, você pode:

### **📦 CRUD Completo**
- ✅ Criar produtos
- ✅ Visualizar produtos
- ✅ Editar produtos
- ✅ Excluir produtos

### **💾 Exportar/Importar**
- ✅ Exportar JSON
- ✅ Importar JSON

### **🔍 Busca e Filtros**
- ✅ Buscar por nome/descrição
- ✅ Filtrar por categoria

## 🎨 Interface

Após login, você verá:
- Botão "🚪 Sair" (canto superior direito)
- Sistema completo de gerenciamento
- Todas as funcionalidades CRUD

## 📞 Suporte

Para dúvidas sobre segurança ou acesso, consulte este guia ou o README.md principal.

---

**🔒 Sistema protegido - Perfumaria Golden**