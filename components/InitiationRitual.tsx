
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const InitiationRitual: React.FC = () => {
  const [intent, setIntent] = useState('');
  const [soulboundData, setSoulboundData] = useState<{ image: string, role: string, id: string } | null>(null);
  const [isRitualizing, setIsRitualizing] = useState(false);

  const performRitual = async () => {
    if (!intent.trim()) return;
    setIsRitualizing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Gerar a Persona e o Papel
      const textResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Com base nesta intenção: "${intent}", defina um título de papel místico para este nó na rede Aetheris (Ex: O Alquimista de Dados, O Sentinela Neural). Responda apenas com o título.`,
      });
      const role = textResponse.text?.trim() || "Nó Validado";

      // Gerar o Avatar Visual
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A mystical, cyber-baroque soulbound identity avatar for a blockchain entity called "${role}". High-fashion tech, gold filigree, obsidian textures, cian energy leaks, 8k, centered portrait.` }],
        },
        config: { imageConfig: { aspectRatio: "1:1", imageSize: "1K" } }
      });

      let imageData = "";
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          imageData = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      setSoulboundData({
        image: imageData,
        role: role,
        id: `AETHR-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
      });
    } catch (e) {
      console.error("Ritual falhou.");
    } finally {
      setIsRitualizing(false);
    }
  };

  return (
    <div className="py-24 px-4 bg-zinc-950 border-y border-white/5" id="initiation">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-grotesk font-extrabold text-white mb-4 uppercase tracking-tighter italic">O Rito de <span className="text-amber-500">Convergência</span></h2>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em]">Manifeste sua presença na rede</p>
        </div>

        {!soulboundData ? (
          <div className="glass p-12 rounded-[3.5rem] border-amber-500/20 bg-amber-950/5 text-center">
            <h3 className="text-2xl font-bold mb-6 text-white">Qual sua intenção para o Futuro?</h3>
            <textarea 
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="Ex: 'Eu busco proteger a privacidade de dados através da descentralização total...'"
              className="w-full h-32 bg-black/60 border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-amber-500/50 mb-8 resize-none"
            />
            <button 
              onClick={performRitual}
              disabled={isRitualizing || !intent}
              className="px-12 py-5 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-2xl transition-all shadow-2xl disabled:opacity-50 group"
            >
              {isRitualizing ? 'MANIFESTANDO ALMA...' : 'INICIAR RITUAL'}
              <span className="block text-[8px] mt-1 opacity-50 font-mono">CONSUMO: 10 $AETHR BURN</span>
            </button>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 duration-700">
            <div className="glass p-1 rounded-[3.5rem] border-amber-500/30 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <img src={soulboundData.image} alt="Soulbound Identity" className="w-full aspect-square object-cover" />
              <div className="absolute bottom-12 left-12 z-20">
                <div className="text-amber-500 font-mono text-xs mb-2 tracking-widest">{soulboundData.id}</div>
                <h4 className="text-4xl font-extrabold text-white uppercase tracking-tighter leading-none">{soulboundData.role}</h4>
                <div className="mt-6 flex gap-4">
                  <button className="px-6 py-2 bg-white text-black font-bold rounded-lg text-xs uppercase">Compartilhar Nexus</button>
                  <button onClick={() => setSoulboundData(null)} className="px-6 py-2 glass text-white font-bold rounded-lg text-xs uppercase">Renovar Rito</button>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-500 text-xs font-mono uppercase tracking-[0.2em]">
              Identidade Soulbound Registrada no Bloco Gênese da AetherNet
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InitiationRitual;
