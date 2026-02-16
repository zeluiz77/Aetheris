
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical: Root element not found");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Aetheris App Crash:", error);
    rootElement.innerHTML = `
      <div style="background: black; color: #ef4444; padding: 20px; font-family: monospace; height: 100vh;">
        <h1>[NEURAL_COLLAPSE]: INITIALIZATION_FAILED</h1>
        <p>O app falhou ao iniciar. Verifique o console do navegador (F12) para detalhes.</p>
        <pre>${error}</pre>
        <button onclick="location.reload()" style="background: white; color: black; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Tentar Reiniciar</button>
      </div>
    `;
  }
}
