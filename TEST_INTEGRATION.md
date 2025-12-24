# 🛍️ Como Testar a Integração de Produtos

## ✅ **Configuração Atual**

O sistema está configurado com um backend simples que permite CRUD completo de produtos. 

## 🚀 **Passo 1: Iniciar o Backend**

```bash
npm run server
```

Você deverá ver:
```
🚀 Backend server running on http://localhost:3001
📊 Admin panel: http://localhost:3001/admin
🔗 API endpoints: http://localhost:3001/api
🛍️ Frontend: http://localhost:5173
```

## 📱 **Passo 2: Acessar Painel Admin**

Abra no navegador: **http://localhost:3001/admin**

Você verá uma interface onde pode:
- ✅ Adicionar novos produtos
- ✅ Ver produtos existentes  
- ✅ Excluir produtos

## 🛒 **Passo 3: Iniciar o Frontend**

Em outro terminal:
```bash
npm run dev
```

Acesse: **http://localhost:5173**

## 🔄 **Passo 4: Testar Integração**

### **Adicionar Produto via Painel Admin:**
1. Vá para http://localhost:3001/admin
2. Preencha o formulário:
   - **Nome**: Perfume Golden Special
   - **Descrição**: Um perfume exclusivo e elegante
   - **Preço**: 199.90
   - **Categoria**: Perfumes Masculinos
   - **URL Imagem**: https://images.unsplash.com/photo-1523296848231-263a9c2a7a5a
   - **Estoque**: 10
3. Clique em "Adicionar Produto"

### **Verificar no Site:**
1. Vá para http://localhost:5173
2. O novo produto deve aparecer na página inicial
3. Verifique se o produto está visível e com todas as informações

## 🔧 **Teste via API (Opcional)**

Você pode testar diretamente via API usando o navegador ou ferramentas como Postman:

### **Listar Produtos:**
```
GET http://localhost:3001/api/products
```

### **Adicionar Produto:**
```
POST http://localhost:3001/api/products
Content-Type: application/json

{
  "name": "Perfume Teste API",
  "description": "Adicionado via API",
  "price": 149.90,
  "category": "Perfumes Femininos",
  "image": "https://images.unsplash.com/photo-1523296848231-263a9c2a7a5a",
  "stock": 5,
  "featured": true,
  "outOfStock": false,
  "available": true
}
```

## 📊 **Estrutura de Dados**

Os produtos têm esta estrutura:
```javascript
{
  id: "timestamp",
  name: "Nome do Produto",
  description: "Descrição detalhada", 
  price: 199.90,
  category: "Perfumes Masculinos",
  image: "URL da imagem",
  stock: 10,
  featured: true,
  outOfStock: false,
  available: true,
  createdAt: "2025-12-16T..."
}
```

## 🎯 **Categorias Disponíveis**
- Perfumes Masculinos
- Perfumes Femininos  
- Corpo e Banho
- Cuidados com a Pele
- Maquiagem
- Acessórios

## ✅ **Verificação Final**

Após adicionar um produto:
1. ✅ Verifique se aparece no painel admin
2. ✅ Verifique se aparece no site frontend
3. ✅ Teste se pode adicionar ao carrinho
4. ✅ Verifique se as informações estão corretas

## 🔍 **Troubleshooting**

**Se o produto não aparecer no site:**
- Verifique se o backend está rodando (porta 3001)
- Verifique se o frontend está rodando (porta 5173)
- Abra o console do navegador (F12) para ver erros
- Verifique a aba Network para ver se a API está sendo chamada

**Se a API não responder:**
- Reinicie o servidor backend
- Verifique se a porta 3001 não está em uso
- Limpe o cache do navegador

O sistema está pronto para uso! Qualquer produto adicionado através do painel admin aparecerá automaticamente no site.