
# 🌟 Perfumaria Golden

E-commerce completo de produtos de beleza com integração WhatsApp, desenvolvido em React + TypeScript + Tailwind CSS.

## 📋 Sobre o Projeto

Site de e-commerce frontend-only para venda de produtos de beleza (perfumes, cosméticos, cuidados para cabelo, unhas, pele e maquiagem) com checkout via WhatsApp.

### ✨ Funcionalidades

- 🛍️ Catálogo completo de produtos com busca e filtros
- 🛒 Carrinho de compras com persistência (localStorage)
- 📱 Checkout via WhatsApp com mensagem formatada
- 🎠 Carousel de produtos em destaque
- ♿ Acessibilidade completa (VLibras, alto contraste, navegação por teclado)
- 📱 Design responsivo (mobile e desktop)
- 🎨 Tema elegante marrom e dourado

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Instalação

1. **Clone o repositório** (ou baixe os arquivos)
```bash
git clone [url-do-repositorio]
cd perfumaria-golden
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure o número do WhatsApp**

Edite o arquivo `utils/whatsapp.ts` e altere o número na linha 6:
```typescript
const phoneNumber = '5516997320195'; // Seu número com DDI + DDD
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm start
# ou
yarn start
```

5. **Acesse no navegador**
```
http://localhost:3000
```

## 📦 Build para Produção

```bash
npm run build
# ou
yarn build
```

Os arquivos otimizados estarão na pasta `build/`.

## 🛠️ Gerenciamento de Produtos

Consulte o arquivo **[PRODUTOS.md](./PRODUTOS.md)** para instruções detalhadas sobre:
- Como adicionar novos produtos
- Como editar produtos existentes
- Como remover produtos
- Como importar produtos via CSV/XML
- Estrutura do arquivo products.json

## ♿ Recursos de Acessibilidade

Este site possui recursos completos de acessibilidade:

### 🗣️ VLibras (Libras)
- Widget no canto inferior direito (botão marrom)
- Tradução automática para Língua Brasileira de Sinais
- Clique no botão para ativar

### 🎨 Alto Contraste
- Suporte automático para modo de alto contraste do sistema
- Cores otimizadas para daltonismo
- Paleta marrom/dourado com boa legibilidade

### ⌨️ Navegação por Teclado
- Todos os elementos interativos acessíveis via Tab
- Indicadores de foco visíveis
- ARIA labels em todos os componentes

### 🔍 Leitores de Tela
- Estrutura semântica HTML5
- Alt text em todas as imagens
- Descrições ARIA completas

## 📱 Configuração do WhatsApp

### Formato do Número
O número deve estar no formato internacional sem espaços ou caracteres especiais:
```
5516997320195
```
Onde:
- `55` = Código do Brasil
- `16` = DDD
- `997320195` = Número do celular

### Mensagem Enviada
A mensagem inclui automaticamente:
- Dados do cliente (nome, celular, email, endereço)
- Lista de produtos com quantidades
- Subtotais e total do pedido
- Formatação UTF-8 com emojis

## 🎨 Personalização

### Cores
As cores principais estão definidas em `tailwind.config.js`:
```javascript
colors: {
  amber: { /* tons de marrom */ },
}
```

### Fontes
Fontes configuradas em `index.css`:
- **Títulos**: Playfair Display (serif elegante)
- **Corpo**: Inter (sans-serif moderna)

## 📂 Estrutura do Projeto

```
perfumaria-golden/
├── components/          # Componentes React reutilizáveis
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── CartItem.tsx
│   ├── CartSidebar.tsx
│   ├── CheckoutForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── ProductCarousel.tsx
├── data/
│   └── products.json    # Catálogo de produtos (EDITE AQUI!)
├── hooks/
│   └── useCart.ts       # Lógica do carrinho
├── pages/               # Páginas da aplicação
│   ├── Cart.tsx
│   ├── Home.tsx
│   └── Products.tsx
├── utils/
│   ├── whatsapp.ts      # Geração de mensagem WhatsApp
│   └── importProducts.ts # Importação CSV/XML
├── App.tsx              # Componente principal
├── index.css            # Estilos globais
└── index.tsx            # Ponto de entrada
```

## 🐛 Solução de Problemas

### O carrinho não abre ao adicionar produto
- Verifique se o componente `CartSidebar` está renderizado no `App.tsx`
- Verifique o console do navegador por erros

### Produtos não aparecem
- Verifique se o arquivo `data/products.json` está correto
- Valide o JSON em um validador online

### WhatsApp não abre
- Verifique se o número está no formato correto (sem espaços ou caracteres)
- Teste em um dispositivo com WhatsApp instalado

### VLibras não aparece
- Aguarde alguns segundos após o carregamento da página
- Verifique sua conexão com a internet (widget carrega de servidor externo)

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.

## 🤝 Suporte

Para dúvidas sobre gerenciamento de produtos, consulte [PRODUTOS.md](./PRODUTOS.md).

---

**Desenvolvido com ❤️ para Perfumaria Golden**
