
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { backend, UserProgress } from '../services/backendService.ts';

const ArtifactFactory: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    backend.getUserProgress().then(setProgress);
  }, []);

  const isPrestigeAvailable = (progress?.level || 1) >= 3;

  const generateArtifact = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setImageUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A futuristic, high-tech, cybernetic artifact representing ${prompt}. Detailed, cinematic lighting, 8k resolution, obsidian and cian colors.` }],
        },
        config: {
          imageConfig: { aspectRatio: "1:1", imageSize: "1K" }
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (e) {
      console.error("Artifact generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-24 px-4 bg-zinc-950/50" id="artifacts">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-grotesk font-extrabold text-white mb-6 uppercase tracking-tighter">Fábrica de <span className="text-cyan-400">Artefatos</span></h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Transforme a volatilidade do mercado em formas visuais. 
              {isPrestigeAvailable ? (
                <span className="text-green-400 block font-bold mt-2">RECOMPENSA DE PRESTÍGIO: Invocação Gratuita Habilitada (Nível {progress?.level}).</span>
              ) : (
                <span className="block mt-2">Cada artefato gerado consome <span className="text-cyan-400 font-bold">5 $AETHR</span>. Desbloqueie gratuidade no Nível 3.</span>
              )}
            </p>
            
            <div className="space-y-4">
              <div className="glass p-6 rounded-3xl border-white/5">
                <label className="text-[10px] font-bold text-gray-500 uppercase mb-3 block">Arquétipo Neural</label>
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: O Coração da Rede, O Guardião de Dados..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <button 
                onClick={generateArtifact}
                disabled={isGenerating || !prompt}
                className="w-full py-5 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl hover:scale-[1.02] disabled:opacity-50 uppercase tracking-[0.2em] text-[11px]"
              >
                {isGenerating ? 'MANIFESTANDO...' : isPrestigeAvailable ? 'INVOCAR ARTEFATO DE PRESTÍGIO' : 'INVOCAR ARTEFATO'}
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-all"></div>
            <div className="aspect-square w-full glass rounded-[3rem] border-cyan-500/30 overflow-hidden relative flex items-center justify-center bg-black/40 backdrop-blur-3xl">
              {imageUrl ? (
                <img src={imageUrl} alt="Neural Artifact" className="w-full h-full object-cover animate-in zoom-in-95 duration-1000" />
              ) : (
                <div className="text-center p-12">
                  <div className={`w-24 h-24 mx-auto border-2 border-dashed border-cyan-500/20 rounded-full flex items-center justify-center mb-6 ${isGenerating ? 'animate-spin' : ''}`}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  </div>
                  <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest">Vácuo Neural Aguardando Manifestação</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactFactory;
