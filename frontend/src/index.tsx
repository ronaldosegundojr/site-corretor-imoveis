import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from "./App";
import './index.css';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Failed to find the root element. Please check if <div id="root"> exists in index.html');
}

const root = createRoot(rootElement);

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Fatal crash during initial render:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; color: #721c24; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px;">
      <h2 style="margin-top: 0;">Oops! Algo deu errado ao carregar o site.</h2>
      <p>Erro detectado no carregamento inicial. Por favor, verifique o console do desenvolvedor.</p>
      <pre style="white-space: pre-wrap; font-size: 12px;">${error instanceof Error ? error.message : String(error)}</pre>
      <button onclick="window.location.reload()" style="background: #721c24; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Tentar Novamente</button>
    </div>
  `;
}