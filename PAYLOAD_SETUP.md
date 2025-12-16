# Como Usar Payload CMS com a Perfumaria Golden

Este projeto agora integra com Payload CMS para gerenciamento completo de produtos, imagens e conteúdo dinâmico.

## Setup Rápido

### 1. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Payload CMS Configuration
PAYLOAD_SECRET=sua-chave-secreta-aqui
MONGODB_URL=mongodb://localhost:27017/perfumaria-golden
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
NODE_ENV=development
PORT=3001

# Frontend Configuration
VITE_PAYLOAD_URL=http://localhost:3001
```

### 2. Iniciar MongoDB

Certifique-se de ter o MongoDB rodando localmente:
```bash
# Instalar MongoDB se não tiver
# Windows: Baixe e instale do site oficial
# macOS: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Iniciar MongoDB
mongod
```

### 3. Iniciar o Servidor Payload

Em um terminal, rode:
```bash
npm run payload:dev
```

Isso iniciará o servidor Payload na porta 3001.

### 4. Iniciar o Frontend

Em outro terminal, rode:
```bash
npm run dev
```

O frontend estará disponível em http://localhost:5173

## Acessar o Painel Admin

Acesse http://localhost:3001/admin para gerenciar seus produtos.

### Primeiro Acesso

1. Crie o primeiro usuário administrador
2. Faça login com suas credenciais
3. Comece a adicionar produtos!

## Funcionalidades

### Gestão de Produtos

- **Nome**: Título do produto
- **Descrição**: Editor rich text para descrições detalhadas
- **Preço**: Valor numérico
- **Imagem**: Upload de imagens direto no painel
- **Categorias**: Perfumes, Cabelos, Unhas, Pele, Maquiagem
- **Status**: Disponibilidade, bestseller, fora de estoque
- **Controle de Estoque**: Opções avançadas de visibilidade

### Gestão de Mídia

- Upload de imagens organizadas
- Configuração de texto alternativo (SEO)
- Integração automática com produtos

### Usuários

- Sistema de autenticação integrado
- Perfis de usuário personalizáveis

## Deploy em Produção

### MongoDB Atlas

1. Crie uma conta no [MongoDB Atlas](https://cloud.mongodb.com)
2. Crie um cluster gratuito
3. Obtenha a string de conexão
4. Atualize `MONGODB_URL` no `.env`

### Vercel

1. Configure as variáveis de ambiente no Vercel Dashboard
2. Deploy automático ao fazer push para main

### Render (para Payload)

1. Faça fork do projeto
2. Configure no Render com comando `npm run payload`
3. Configure o webhook para deploy automático

## API Endpoints

### Produtos
- `GET /api/products` - Listar todos os produtos
- `POST /api/products` - Criar novo produto
- `GET /api/products/{id}` - Obter produto específico
- `PUT /api/products/{id}` - Atualizar produto
- `DELETE /api/products/{id}` - Excluir produto

### Mídia
- `GET /api/media` - Listar todas as mídias
- `POST /api/media` - Upload de mídia
- `GET /api/media/{id}` - Obter mídia específica

## Estrutura de Dados

### Product Schema

```typescript
{
  id: string;
  name: string;
  description: RichText;
  price: number;
  image: Upload; // Referência para mídia
  available: boolean;
  outOfStock: boolean;
  showWhenOutOfStock: boolean;
  category: 'Perfumes' | 'Cabelos' | 'Unhas' | 'Pele' | 'Maquiagem';
  bestseller: boolean;
}
```

## Migrando Dados Existentes

Se você já tem produtos no arquivo `products.json`:

1. Acesse o painel admin
2. Importe os produtos manualmente ou via API
3. Faça upload das imagens
4. O sistema buscará automaticamente do Payload

## Troubleshooting

### Conexão MongoDB
- Verifique se o MongoDB está rodando
- Confirme a string de conexão no `.env`
- Teste com MongoDB Compass se disponível

### Portas em Uso
- Payload: 3001
- Frontend: 5173
- MongoDB: 27017

### Dados Não Aparecendo
1. Verifique se o servidor Payload está rodando
2. Confirme a URL no `VITE_PAYLOAD_URL`
3. Use o DevTools para verificar requisições de rede

## Suporte

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [MongoDB Atlas](https://cloud.mongodb.com)
- [Issues do Projeto](https://github.com/seu-repo/issues)