
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const AetherOracle: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [sources, setSources] = useState<{title: string, uri: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const synthesizeReality = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setSources([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Analise com profundidade técnica e geopolítica: ${query}`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setResult(response.text || "A síntese falhou.");
      
      // Extrair fontes da busca
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const extractedSources = chunks
          .filter((c: any) => c.web)
          .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
        setSources(extractedSources);
      }
    } catch (e) {
      setResult("Erro ao acessar as camadas de dados externos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 px-4 bg-transparent relative" id="oracle">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h2 className="text-5xl font-grotesk font-extrabold text-white mb-4 tracking-tighter uppercase">Oráculo de <span className="text-amber-500">Síntese</span></h2>
          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">Validando a realidade física através da malha neural</p>
        </div>

        <div className="glass p-10 rounded-[3rem] border-amber-500/20 bg-amber-950/5 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: Qual o impacto da IA na economia brasileira em 2025?"
              className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all shadow-inner"
            />
            <button 
              onClick={synthesizeReality}
              disabled={loading}
              className="px-10 py-4 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-2xl transition-all shadow-lg shadow-amber-900/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'SINTETIZANDO...' : 'SINTETIZAR'}
            </button>
          </div>

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed bg-black/40 p-8 rounded-3xl border border-white/5 mb-8">
                {result}
              </div>

              {sources.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Fontes de Grounding:</h4>
                  <div className="flex flex-wrap gap-3">
                    {sources.map((s, i) => (
                      <a 
                        key={i} 
                        href={s.uri} 
                        target="_blank" 
                        className="glass px-4 py-2 rounded-xl text-[10px] text-gray-400 hover:text-white hover:border-amber-500/30 transition-all flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                        {s.title.slice(0, 30)}...
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!result && !loading && (
            <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl opacity-30">
              <p className="text-sm font-mono text-gray-500">Aguardando entrada de consulta estratégica...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AetherOracle;
