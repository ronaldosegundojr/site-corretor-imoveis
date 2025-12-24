# Database Options for Payload CMS

## Opções de Bancos de Dados Gratuitos:

### 1. SQLite (Configurado agora) ✅
- **Gratuito 100%**
- Arquivo local (`payload.db`)
- Sem instalação necessária
- Perfeito para desenvolvimento

### 2. PostgreSQL (Local)
- Instale PostgreSQL Community Edition
- Gratuita para uso local
- Mais robusta que SQLite

### 3. MySQL/MariaDB (Local)
- MariaDB é 100% open source
- Gratuita para uso local
- Muito popular

### 4. MongoDB Atlas (Cloud)
- **Plano gratuito disponível**
- 512MB de armazenamento
- Sem custo para pequenos projetos

## Para usar o SQLite (já configurado):

### 1. Copie o .env:
```bash
cp .env.example .env
```

### 2. Inicie o Payload:
```bash
npm run payload:dev
```

### 3. Acesse: http://localhost:3001/admin

O banco de dados será criado automaticamente no arquivo `payload.db` na raiz do projeto.

---

**Importante**: MongoDB não virou pago - o MongoDB Community (local) continua gratuito, apenas o Atlas (cloud) tem planos pagos, mas ainda mantém o plano gratuito!

## Como Usar o Payload CMS com a Perfumaria Golden

### Setup Rápido

1. **Configurar Variáveis de Ambiente**
   ```bash
   cp .env.example .env
   ```

2. **Iniciar o Servidor Payload** (Terminal 1)
   ```bash
   npm run payload:dev
   ```

3. **Iniciar o Frontend** (Terminal 2)
   ```bash
   npm run dev
   ```

4. **Acessar o Painel Admin**
   - URL: http://localhost:3001/admin
   - Crie o primeiro usuário administrador
   - Comece a adicionar produtos!

### URLs de Acesso
- **Payload Admin**: http://localhost:3001/admin
- **Frontend**: http://localhost:5173
- **API Payload**: http://localhost:3001/api

### Funcionalidades Disponíveis
- Gestão completa de produtos
- Upload de imagens
- Editor rich text para descrições
- Sistema de usuários
- API REST automática