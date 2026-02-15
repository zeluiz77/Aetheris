
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const CinematicVisions: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'checking' | 'generating' | 'done'>('idle');
  const [progressMsg, setProgressMsg] = useState('');

  const generateVision = async () => {
    if (!prompt.trim()) return;
    
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
      return;
    }

    setStatus('generating');
    setProgressMsg('Iniciando renderização na Veo Engine...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A high-end cinematic representation of: ${prompt}. Sci-fi, clean aesthetics, 1080p, slow camera movement, future of decentralized AI and humanity.`,
        config: { numberOfVideos: 1, resolution: '1080p', aspectRatio: '16:9' }
      });

      const messages = [
        'Sincronizando malha neural...',
        'Compilando fluxos temporais...',
        'Materializando arquitetura visual...',
        'Finalizando projeção de luz...'
      ];
      let msgIdx = 0;

      while (!operation.done) {
        setProgressMsg(messages[msgIdx % messages.length]);
        msgIdx++;
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setVideoUrl(URL.createObjectURL(blob));
      setStatus('done');
    } catch (e) {
      console.error(e);
      setStatus('idle');
      alert("Erro na manifestação temporal. Verifique o faturamento da API.");
    }
  };

  return (
    <div className="py-24 px-4 bg-black" id="visions">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-grotesk font-extrabold text-white mb-4 uppercase tracking-tighter">Visões <span className="text-purple-500">Cinemáticas</span></h2>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Renderizando o futuro pós-centralização em 1080p</p>
        </div>

        <div className="glass p-12 rounded-[3.5rem] border-purple-500/20 bg-purple-950/5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                <label className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-4">Prompt de Realidade</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Descreva o futuro: 'Uma metrópole governada por IA ética onde cada cidadão é um nó validador...'"
                  className="w-full h-32 bg-transparent text-white font-medium outline-none resize-none placeholder:text-zinc-700"
                />
              </div>
              
              <button 
                onClick={generateVision}
                disabled={status === 'generating' || !prompt}
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {status === 'generating' ? 'PROJETANDO VISÃO...' : 'MANIFESTAR VÍDEO'}
              </button>

              <div className="p-4 border border-blue-500/10 rounded-xl bg-blue-500/5">
                <p className="text-[9px] text-gray-500 leading-relaxed font-mono">
                  INFO: Este processo utiliza o modelo VEO 3.1. Requer uma chave de API de projeto GCP faturado. Um link para faturamento: ai.google.dev/gemini-api/docs/billing.
                </p>
              </div>
            </div>

            <div className="aspect-video glass rounded-3xl border-white/10 overflow-hidden relative group">
              {videoUrl ? (
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-zinc-900/50">
                  {status === 'generating' ? (
                    <div className="space-y-6">
                      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-purple-400 font-mono text-xs animate-pulse">{progressMsg}</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                      </div>
                      <h4 className="text-gray-500 text-sm font-bold uppercase tracking-widest">Aguardando Parâmetros</h4>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicVisions;
