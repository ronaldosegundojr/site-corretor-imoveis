
# 📦 Gerenciamento de Produtos - Perfumaria Golden

Guia completo para adicionar, editar e remover produtos do catálogo.

## 📋 Índice

1. [Edição Manual (Recomendado)](#edição-manual)
2. [Importação via CSV](#importação-via-csv)
3. [Importação via XML](#importação-via-xml)
4. [Estrutura dos Dados](#estrutura-dos-dados)
5. [Exemplos Práticos](#exemplos-práticos)

---

## 📝 Edição Manual

### Localização do Arquivo
```
data/products.json
```

### Como Adicionar um Produto

1. Abra o arquivo `data/products.json`
2. Copie um produto existente
3. Cole no final da lista (antes do `]` final)
4. Modifique os campos
5. Salve o arquivo

**Exemplo:**
```json
{
  "id": "31",
  "name": "Novo Produto",
  "description": "Descrição detalhada do produto",
  "price": 99.90,
  "image": "https://images.unsplash.com/photo-exemplo?w=400&q=80",
  "available": true,
  "category": "Perfumes"
}
```

### Como Editar um Produto

1. Abra `data/products.json`
2. Localize o produto pelo `id` ou `name`
3. Modifique os campos desejados
4. Salve o arquivo

### Como Remover um Produto

1. Abra `data/products.json`
2. Localize o produto
3. Delete o objeto completo (incluindo as chaves `{}`)
4. **Atenção:** Não esqueça de ajustar as vírgulas entre produtos
5. Salve o arquivo

---

## 📊 Importação via CSV

### Formato do Arquivo CSV

Crie um arquivo `produtos.csv` com as seguintes colunas:

```csv
id,name,description,price,image,available,category
31,Produto Teste,Descrição do produto,99.90,https://exemplo.com/imagem.jpg,true,Perfumes
32,Outro Produto,Outra descrição,149.90,https://exemplo.com/imagem2.jpg,true,Cabelos
```

### Como Importar

1. **Prepare seu arquivo CSV** seguindo o formato acima
2. **Salve o arquivo** como `produtos.csv` na pasta raiz do projeto
3. **Execute o script de importação:**

```bash
npm run import-csv
# ou
node utils/importProducts.js csv produtos.csv
```

4. **Verifique** o arquivo `data/products.json` gerado
5. **Faça o deploy** do site atualizado

### Regras do CSV

- **Separador:** vírgula (`,`)
- **Encoding:** UTF-8
- **Primeira linha:** cabeçalho (obrigatório)
- **Campos de texto:** use aspas duplas se contiver vírgulas
- **Booleanos:** `true` ou `false` (minúsculas)
- **Preços:** use ponto como separador decimal (ex: `99.90`)

---

## 🗂️ Importação via XML

### Formato do Arquivo XML

Crie um arquivo `produtos.xml` com a seguinte estrutura:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<products>
  <product>
    <id>31</id>
    <name>Produto Teste</name>
    <description>Descrição do produto</description>
    <price>99.90</price>
    <image>https://exemplo.com/imagem.jpg</image>
    <available>true</available>
    <category>Perfumes</category>
  </product>
  <product>
    <id>32</id>
    <name>Outro Produto</name>
    <description>Outra descrição</description>
    <price>149.90</price>
    <image>https://exemplo.com/imagem2.jpg</image>
    <available>true</available>
    <category>Cabelos</category>
  </product>
</products>
```

### Como Importar

1. **Prepare seu arquivo XML** seguindo o formato acima
2. **Salve o arquivo** como `produtos.xml` na pasta raiz do projeto
3. **Execute o script de importação:**

```bash
npm run import-xml
# ou
node utils/importProducts.js xml produtos.xml
```

4. **Verifique** o arquivo `data/products.json` gerado
5. **Faça o deploy** do site atualizado

---

## 📐 Estrutura dos Dados

### Campos Obrigatórios

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `id` | string | Identificador único | `"1"` |
| `name` | string | Nome do produto | `"Golden Rose"` |
| `description` | string | Descrição detalhada | `"Perfume floral sofisticado..."` |
| `price` | number | Preço em reais | `189.90` |
| `image` | string | URL completa da imagem | `"https://..."` |
| `available` | boolean | Disponibilidade | `true` ou `false` |
| `category` | string | Categoria do produto | `"Perfumes"` |

### Categorias Disponíveis

- `Perfumes`
- `Cabelos`
- `Unhas`
- `Pele`
- `Maquiagem`

**Importante:** Use exatamente esses nomes (com maiúscula inicial) para que os filtros funcionem corretamente.

### Formato de Imagens

- **URL completa** (não use caminhos relativos)
- **Recomendado:** Unsplash, Imgur, ou seu próprio servidor
- **Dimensões sugeridas:** 400x400px ou maior
- **Formato:** JPG, PNG ou WebP

**Exemplos de URLs válidas:**
```
https://images.unsplash.com/photo-1234567890?w=400&q=80
https://i.imgur.com/abc123.jpg
https://seusite.com/imagens/produto.jpg
```

---

## 💡 Exemplos Práticos

### Exemplo 1: Adicionar Perfume

```json
{
  "id": "31",
  "name": "Lavanda Provence",
  "description": "Perfume suave com lavanda francesa e notas amadeiradas",
  "price": 179.90,
  "image": "https://images.unsplash.com/photo-1588405748880-12d1d2a59bd9?w=400&q=80",
  "available": true,
  "category": "Perfumes"
}
```

### Exemplo 2: Adicionar Produto de Cabelo

```json
{
  "id": "32",
  "name": "Máscara Reconstrução Total",
  "description": "Tratamento intensivo para cabelos muito danificados",
  "price": 89.90,
  "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&q=80",
  "available": true,
  "category": "Cabelos"
}
```

### Exemplo 3: Produto Indisponível

```json
{
  "id": "33",
  "name": "Base Matte HD",
  "description": "Base de alta cobertura com acabamento matte",
  "price": 119.90,
  "image": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
  "available": false,
  "category": "Maquiagem"
}
```

---

## ⚠️ Dicas Importantes

### ✅ Boas Práticas

1. **IDs únicos:** Sempre use IDs diferentes para cada produto
2. **Backup:** Faça backup do `products.json` antes de editar
3. **Validação:** Use um validador JSON online após editar
4. **Imagens:** Teste as URLs das imagens antes de adicionar
5. **Preços:** Use sempre ponto (`.`) como separador decimal

### ❌ Erros Comuns

1. **Vírgula faltando ou sobrando** entre produtos
2. **Aspas não fechadas** em strings
3. **URLs de imagem quebradas** (404)
4. **Categoria com nome errado** (não aparecerá nos filtros)
5. **Preço com vírgula** em vez de ponto

### 🔍 Como Validar o JSON

1. Copie todo o conteúdo de `products.json`
2. Acesse: https://jsonlint.com/
3. Cole o conteúdo e clique em "Validate JSON"
4. Corrija os erros apontados

---

## 🚀 Deploy Após Alterações

Após adicionar/editar produtos:

1. **Salve** o arquivo `data/products.json`
2. **Teste localmente:**
   ```bash
   npm start
   ```
3. **Verifique** se os produtos aparecem corretamente
4. **Faça o build:**
   ```bash
   npm run build
   ```
5. **Faça o deploy** da pasta `build/` para seu servidor

---

## 📞 Suporte

Se tiver dúvidas:
1. Consulte os exemplos neste documento
2. Verifique o arquivo `data/products.json` existente como referência
3. Use um validador JSON para encontrar erros de sintaxe

---

**Última atualização:** 2024
