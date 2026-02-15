
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const WorldPulse: React.FC = () => {
  const [mood, setMood] = useState<'Expansive' | 'Defensive' | 'Balanced'>('Balanced');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(true);

  const updatePulse = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: 'Analise as notícias recentes sobre centralização de IA, regulamentação de cripto e hardware descentralizado. Como a rede Aetheris deve reagir hoje? Responda com um breve manifesto de 3 frases e defina o humor do protocolo entre: Expansivo, Defensivo ou Equilibrado.',
        config: { tools: [{ googleSearch: {} }] }
      });

      const text = response.text || "";
      setAnalysis(text);
      if (text.toLowerCase().includes('expansivo')) setMood('Expansive');
      else if (text.toLowerCase().includes('defensivo')) setMood('Defensive');
      else setMood('Balanced');
      
    } catch (e) {
      setAnalysis("As camadas de dados externos estão em névoa. O protocolo mantém estabilidade neutra.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updatePulse();
    const interval = setInterval(updatePulse, 300000); // 5 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-24 px-4 bg-black relative overflow-hidden" id="pulse">
      <div className={`absolute top-0 left-0 w-full h-1 transition-all duration-1000 ${
        mood === 'Expansive' ? 'bg-cyan-500 shadow-[0_0_20px_#06b6d4]' : 
        mood === 'Defensive' ? 'bg-amber-600 shadow-[0_0_20px_#d97706]' : 'bg-blue-500 shadow-[0_0_20px_#3b82f6]'
      }`}></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/3 text-center md:text-left">
          <h2 className="text-4xl font-grotesk font-extrabold text-white mb-2 uppercase tracking-tighter">Humor do <span className="text-gray-500">Protocolo</span></h2>
          <div className={`text-5xl font-black uppercase italic ${
            mood === 'Expansive' ? 'text-cyan-400' : mood === 'Defensive' ? 'text-amber-500' : 'text-blue-500'
          }`}>
            {mood}
          </div>
          <button onClick={updatePulse} className="mt-6 text-[10px] font-mono text-gray-600 hover:text-white transition-colors flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-800 rounded-full animate-pulse"></span>
            SINCRONIZAÇÃO GLOBAL FORÇADA
          </button>
        </div>

        <div className="md:w-2/3 glass p-10 rounded-[2.5rem] border-white/5 relative">
          {loading ? (
            <div className="flex gap-2 items-center justify-center py-8">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-700">
              <p className="text-gray-400 leading-relaxed italic text-lg mb-6">"{analysis}"</p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-white/5 rounded-full text-[10px] text-gray-500 font-bold uppercase tracking-widest">Grounding: Google Search Real-Time</div>
                <div className="px-4 py-2 bg-white/5 rounded-full text-[10px] text-gray-500 font-bold uppercase tracking-widest">Protocol Sync: Active</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorldPulse;
