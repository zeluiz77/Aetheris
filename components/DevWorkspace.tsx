
import React, { useState, useEffect } from 'react';
import { isCloudEnabled } from '../services/supabaseClient.ts';

const DevWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'manual' | 'env' | 'pipeline'>('terminal');
  const [copied, setCopied] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [supabaseUrl, setSupabaseUrl] = useState(process.env.SUPABASE_URL || '');
  const [supabaseKey, setSupabaseKey] = useState(process.env.SUPABASE_ANON_KEY || '');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startPipelineSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          return 100;
        }
        return p + 2;
      });
    }, 50);
  };

  return (
    <div className="py-24 px-4 bg-zinc-950" id="dev-lab">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,1)]"></div>
              <h2 className="text-4xl font-grotesk font-bold text-white tracking-tighter uppercase">Estação de Controle</h2>
            </div>
            <p className="text-gray-400 max-w-xl text-sm font-mono">
              [SYSTEM]: Status da Infraestrutura: <span className={isCloudEnabled ? "text-green-500" : "text-amber-500"}>{isCloudEnabled ? "PROD_ACTIVE" : "SANDBOX_LOCAL"}</span>
            </p>
          </div>
          <button 
            onClick={startPipelineSync}
            disabled={isSyncing}
            className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            {isSyncing ? "Puxando Repositório..." : "Sincronizar Nexus"}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="glass p-8 rounded-[2.5rem] border-white/5 space-y-6 bg-black/40">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Diagnóstico de Malha
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Supabase Link</span>
                  <span className={`text-[10px] font-mono ${isCloudEnabled ? "text-green-500" : "text-red-500"}`}>{isCloudEnabled ? "CONNECTED" : "MISSING_KEYS"}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Gemini Core</span>
                  <span className={`text-[10px] font-mono ${!!process.env.API_KEY ? "text-green-500" : "text-red-500"}`}>{!!process.env.API_KEY ? "READY" : "OFFLINE"}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Netlify Edge</span>
                  <span className="text-[10px] font-mono text-cyan-500">ACTIVE_NODE</span>
                </div>
              </div>

              <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                <h4 className="text-[10px] font-bold text-blue-400 uppercase mb-2 italic">Persistência Neural</h4>
                <p className="text-[9px] text-gray-500 leading-relaxed">
                  Sem chaves no .env ou no Netlify, o sistema opera em modo volátil (os dados somem ao dar refresh). Conecte o Supabase para persistência real.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass rounded-[3rem] overflow-hidden border-white/5 flex flex-col h-full bg-zinc-900/10 backdrop-blur-3xl shadow-2xl">
              <div className="flex bg-white/5 border-b border-white/10 p-2">
                {[
                  {id: 'terminal', label: 'Terminal'},
                  {id: 'manual', label: 'Manual de Bordo'},
                  {id: 'env', label: 'Configurar .env'},
                  {id: 'pipeline', label: 'Pipeline'}
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-4 text-[9px] font-mono uppercase tracking-[0.2em] rounded-2xl transition-all ${activeTab === tab.id ? 'bg-white/10 text-white shadow-inner' : 'text-gray-500 hover:text-white'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-10 flex-1">
                {activeTab === 'manual' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-bold text-white mb-4">Guia de Sincronização Passo-a-Passo</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 glass border-white/5 rounded-2xl">
                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-black text-black shrink-0">1</div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Criar Projeto no Supabase</h4>
                          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Vá em Settings > API. Copie a <strong>Project URL</strong> e a <strong>Anon Key</strong>.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-4 glass border-white/5 rounded-2xl">
                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-black text-black shrink-0">2</div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Preencher o arquivo .env Local</h4>
                          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Crie o arquivo na pasta raiz. Use os nomes: API_KEY, SUPABASE_URL e SUPABASE_ANON_KEY.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-4 glass border-white/5 rounded-2xl">
                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-black text-black shrink-0">3</div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Cadastrar no Netlify</h4>
                          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">No painel do Netlify do seu site, vá em Site Settings > Environment Variables e adicione as mesmas 3 chaves.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'pipeline' && (
                  <div className="space-y-12 py-6 animate-in fade-in duration-500 text-center">
                    <div className="relative">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 -z-10"></div>
                      <div className="absolute top-1/2 left-0 h-0.5 bg-cyan-500 -translate-y-1/2 -z-10 transition-all duration-500" style={{ width: `${syncProgress}%` }}></div>
                      
                      <div className="flex justify-between items-center px-4 relative">
                        <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${syncProgress > 10 ? 'scale-110' : 'opacity-40'}`}>
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl glass border ${syncProgress > 10 ? 'border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-white/5'}`}>🐙</div>
                          <span className="text-[8px] font-mono uppercase text-gray-500">GitHub</span>
                        </div>
                        <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${syncProgress > 50 ? 'scale-110' : 'opacity-40'}`}>
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl glass border ${syncProgress > 50 ? 'border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-white/5'}`}>◈</div>
                          <span className="text-[8px] font-mono uppercase text-gray-500">Netlify</span>
                        </div>
                        <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${syncProgress > 90 ? 'scale-110' : 'opacity-40'}`}>
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl glass border ${syncProgress > 90 ? 'border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'border-white/5'}`}>⚡</div>
                          <span className="text-[8px] font-mono uppercase text-gray-500">Cloud Sync</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black/40 p-6 rounded-3xl border border-white/5 font-mono text-[10px] leading-relaxed text-left">
                      <div className="text-cyan-500 mb-1">[PIPELINE]: Verificando commit: "Release Aetheris v1.2.0"</div>
                      <div className="text-gray-500 mb-1">Building on Netlify... (34.2s)</div>
                      <div className="text-gray-500 mb-1">Injecting environment secrets...</div>
                      {syncProgress === 100 && <div className="text-green-500 mt-2 animate-pulse font-black">✓ SITE IS LIVE: https://aetheris-neural.netlify.app</div>}
                    </div>
                  </div>
                )}

                {activeTab === 'terminal' && (
                  <div className="bg-black/80 p-8 rounded-3xl border border-white/5 font-mono text-[10px] h-full shadow-inner">
                    <div className="flex gap-2 mb-6">
                       <div className="w-2 h-2 rounded-full bg-red-500"></div>
                       <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                       <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-cyan-500 mb-2">$ aetheris --check-all</div>
                    <div className="text-gray-500 mb-1">Analysing build artifacts...</div>
                    <div className="text-gray-500 mb-1">Detecting backend: http://localhost:3001/api [ALIVE]</div>
                    <div className="text-gray-500 mb-4">Detecting cloud: SUPABASE_INSTANCE [{isCloudEnabled ? 'ENABLED' : 'NOT_FOUND'}]</div>
                    <div className={isCloudEnabled ? "text-green-500 mb-2" : "text-amber-500 mb-2"}>
                      {isCloudEnabled ? "✓ SYSTEM_OPTIMIZED_FOR_PRODUCTION" : "! SYSTEM_RUNNING_IN_SANDBOX_MODE"}
                    </div>
                  </div>
                )}

                {activeTab === 'env' && (
                  <div className="bg-black/40 p-8 rounded-3xl border border-white/5 h-full overflow-y-auto">
                     <h4 className="text-[10px] font-black uppercase text-gray-500 mb-6 tracking-widest">Modelo de Arquivo .env (Copie e Cole)</h4>
                     <div className="bg-black p-6 rounded-xl border border-white/10 font-mono text-xs space-y-3 relative group">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => handleCopy('API_KEY=...\nSUPABASE_URL=...\nSUPABASE_ANON_KEY=...')} className="text-[9px] text-cyan-500 font-bold hover:underline">COPIAR TUDO</button>
                        </div>
                        <div><span className="text-purple-400">API_KEY</span>=<span className="text-green-400">"SUA_CHAVE_GEMINI_AQUI"</span></div>
                        <div><span className="text-purple-400">SUPABASE_URL</span>=<span className="text-green-400">"{supabaseUrl || 'https://sua-id.supabase.co'}"</span></div>
                        <div><span className="text-purple-400">SUPABASE_ANON_KEY</span>=<span className="text-green-400">"{supabaseKey || 'sua-chave-anon-aqui'}"</span></div>
                        <div className="mt-4 pt-4 border-t border-white/5 text-[9px] text-gray-600">
                           # IMPORTANTE: Mantenha as aspas e o nome das chaves em MAIÚSCULO.
                        </div>
                     </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevWorkspace;
