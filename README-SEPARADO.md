# Perfumaria Golden - Estrutura Separada

## 📁 Estrutura de Pastas

```
Perfumaria-Golden-Frontend/
├── frontend/          # Frontend React + TypeScript + Vite
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── .env
├── backend/           # Backend Node.js + Express
│   ├── server-api-only.js
│   ├── database.js
│   ├── public/        # Uploads de imagens
│   ├── data/          # Arquivos JSON
│   ├── package.json
│   └── .env
└── README.md
```

## 🚀 Como Executar

### Backend
```bash
cd backend
npm install
npm start  # ou npm run dev para desenvolvimento
```
🔗 Backend: http://localhost:3001

### Frontend
```bash
cd frontend
npm install
npm run dev
```
🛍️ Frontend: http://localhost:5173

## 🎯 Deploy

### Backend (Render)
- Aponte para pasta `/backend`
- Build Command: `npm install`
- Start Command: `node server-api-only.js`

### Frontend (Vercel)
- Aponte para pasta `/frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

## 🔐 Credenciais
- Email: admin@perfumaria.com
- Senha: admin123