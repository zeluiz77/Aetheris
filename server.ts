
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Correct initialization: new GoogleGenAI({ apiKey: process.env.API_KEY })
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

let protocolStats = {
  price: 0.1245,
  tvl: "4.2B",
  tps: 42105,
  height: 1420582,
  burned: 15420.5,
  neuralLoad: 42
};

// --- MARKETPLACE DATA ---
const neuralModules = [
  { id: 'mod-01', name: 'Sentinel Zero', category: 'Security', price: 150, desc: 'Proteção contra ataques de reentrada via IA.' },
  { id: 'mod-02', name: 'Oracle DeepScan', category: 'Analytics', price: 300, desc: 'Análise preditiva de liquidez em tempo real.' },
  { id: 'mod-03', name: 'Vision Forge Pro', category: 'Creative', price: 500, desc: 'Geração de vídeo 4K sem limites de quota.' },
  { id: 'mod-04', name: 'Code Alchemist', category: 'Dev', price: 200, desc: 'Otimizador de Smart Contracts nativo.' }
];

app.get('/api/stats', (req, res) => res.json(protocolStats));

app.get('/api/marketplace/modules', (req, res) => {
  res.json(neuralModules);
});

app.post('/api/marketplace/purchase', (req, res) => {
  const { moduleId, address } = req.body;
  const mod = neuralModules.find(m => m.id === moduleId);
  if (mod) {
    protocolStats.burned += (mod.price * 0.1); // 10% de queima na compra
    res.json({ success: true, txHash: `0x${Math.random().toString(16).slice(2)}`, burned: mod.price * 0.1 });
  } else {
    res.status(404).json({ error: "Module not found" });
  }
});

app.listen(port, () => {
  console.log(`AETHERIS BACKEND v1.1.0 :: Marketplace Online na porta ${port}`);
});
