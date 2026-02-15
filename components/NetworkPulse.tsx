
import React, { useState, useEffect } from 'react';

interface Block {
  height: number;
  hash: string;
  type: string;
  load: number;
  time: string;
}

const NetworkPulse: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [stats, setStats] = useState({ tps: 42105, height: 1240582, burn: 15420.5 });

  const inferenceTypes = ["Predictive Analysis", "Code Audit", "Zero-Knowledge Proof", "Neural Rendering", "Solidity Opt"];

  useEffect(() => {
    // Inicializa com alguns blocos
    const initialBlocks = Array.from({ length: 6 }).map((_, i) => ({
      height: 1240582 - i,
      hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      type: inferenceTypes[Math.floor(Math.random() * inferenceTypes.length)],
      load: Math.floor(Math.random() * 40) + 60,
      time: 'just now'
    }));
    setBlocks(initialBlocks);

    // Loop de simulação de rede
    const interval = setInterval(() => {
      const newBlock = {
        height: stats.height + 1,
        hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        type: inferenceTypes[Math.floor(Math.random() * inferenceTypes.length)],
        load: Math.floor(Math.random() * 30) + 70,
        time: 'now'
      };

      setBlocks(prev => [newBlock, ...prev.slice(0, 5)]);
      setStats(prev => ({
        tps: prev.tps + (Math.random() > 0.5 ? 12 : -8),
        height: prev.height + 1,
        burn: prev.burn + 0.05
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [stats.height]);

  return (
    <div className="py-24 px-4 bg-black" id="explorer">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-grotesk font-bold text-white mb-2 uppercase tracking-tighter">AetherNet <span className="text-cyan-500">Pulse</span></h2>
            <p className="text-gray-500 font-mono text-xs">MONITORAMENTO DE INFRAESTRUTURA EM TEMPO REAL</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="glass px-6 py-4 rounded-2xl border-cyan-500/20">
              <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Rede TPS</div>
              <div className="text-xl font-mono font-bold text-cyan-400">{stats.tps.toLocaleString()}</div>
            </div>
            <div className="glass px-6 py-4 rounded-2xl border-purple-500/20">
              <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Supply Burned</div>
              <div className="text-xl font-mono font-bold text-purple-400">{stats.burn.toFixed(2)} <span className="text-[10px] opacity-50">$AETHR</span></div>
            </div>
            <div className="glass px-6 py-4 rounded-2xl border-green-500/20">
              <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Uptime</div>
              <div className="text-xl font-mono font-bold text-green-400">99.998%</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tabela de Blocos */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center px-4 mb-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Últimas Inferências Validadas</span>
              <span className="text-[10px] font-mono text-cyan-500/50">LIVE_FEED_ACTIVE</span>
            </div>
            
            <div className="space-y-3">
              {blocks.map((block) => (
                <div key={block.height} className="glass p-5 rounded-2xl border-white/5 flex items-center justify-between group hover:border-cyan-500/30 transition-all animate-in slide-in-from-top-2 duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-white/5">
                      <span className="text-[8px] text-gray-500 font-mono">BLOCK</span>
                      <span className="text-xs font-bold font-mono text-white">#{block.height.toString().slice(-4)}</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{block.type}</div>
                      <div className="text-[10px] font-mono text-gray-500">{block.hash}</div>
                    </div>
                  </div>
                  
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] font-bold text-gray-400 mb-1">Carga Neural</div>
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{ width: `${block.load}%` }}></div>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-cyan-500 ml-4">
                    {block.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa de Nós / Sidebar */}
          <div className="space-y-6">
            <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Global Nodes
              </h3>
              
              {/* Visualização de Mapa Simplificada (SVG) */}
              <div className="aspect-square w-full relative mb-6 opacity-60">
                <svg viewBox="0 0 200 120" className="w-full h-full text-zinc-800">
                  <path d="M20,40 Q40,20 80,30 T140,50 T180,30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="40" cy="45" r="2" className="fill-cyan-500 animate-pulse" />
                  <circle cx="120" cy="35" r="2" className="fill-cyan-500 animate-pulse [animation-delay:0.5s]" />
                  <circle cx="160" cy="80" r="2" className="fill-cyan-500 animate-pulse [animation-delay:1s]" />
                  <circle cx="60" cy="90" r="2" className="fill-cyan-500 animate-pulse [animation-delay:1.5s]" />
                  <circle cx="140" cy="95" r="2" className="fill-cyan-500 animate-pulse [animation-delay:0.2s]" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Nós Ativos</span>
                  <span className="text-white font-mono">1,248</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Tier-1 Validadores</span>
                  <span className="text-white font-mono">156</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Latência Média</span>
                  <span className="text-green-500 font-mono">12ms</span>
                </div>
              </div>

              <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                Seja um Validador PoI
              </button>
            </div>
            
            <div className="p-6 border border-cyan-500/20 rounded-3xl bg-cyan-500/5">
              <h4 className="text-xs font-bold text-cyan-400 uppercase mb-3 tracking-widest">Alerta de Protocolo</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                [INFRA-LOG]: Otimização Neural v2.1 aplicada com sucesso no shard #04. Capacidade de inferência aumentada em 15%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPulse;
