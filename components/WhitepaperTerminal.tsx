
import React, { useState } from 'react';

const CHAPTERS = [
  {
    id: 'intro',
    title: 'O Problema da IA Centralizada',
    content: `Hoje, a inteligência artificial está nas mãos de poucas corporações gigantes (Big Tech). Isso cria um ponto único de falha, censura algorítmica e falta de transparência nos dados.
    
    A Aetheris nasce para quebrar esse monopólio, devolvendo o poder computacional para a comunidade.`
  },
  {
    id: 'poi',
    title: 'Proof of Inference (PoI)',
    content: `PoI é o nosso algoritmo de consenso proprietário. Em vez de gastar energia com cálculos SHA-256 inúteis, nossos mineradores (validadores) utilizam suas GPUs para processar requisições de modelos de linguagem e visão computacional.
    
    Cada bloco é a prova de que uma tarefa de IA foi resolvida corretamente.`
  },
  {
    id: 'tokenomics',
    title: 'Engenharia do $AETHR',
    content: `O token $AETHR não é apenas moeda; é energia. Para cada inferência solicitada na rede, uma fração de token é queimada.
    
    • 40% Ecosystem
    • 20% Staking
    • 10% Burn Mechanism
    
    Isso cria uma pressão deflacionária constante vinculada à demanda real por IA.`
  }
];

const WhitepaperTerminal: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0]);

  return (
    <div className="py-24 px-4 bg-zinc-950/50" id="docs">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-grotesk font-bold text-white mb-2 uppercase tracking-tighter">Whitepaper <span className="text-blue-500">v1.0.4</span></h2>
          <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">Repositório de Inteligência Descentralizada</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar de Navegação */}
          <div className="lg:col-span-1 space-y-2">
            {CHAPTERS.map((chap) => (
              <button
                key={chap.id}
                onClick={() => setActiveChapter(chap)}
                className={`w-full text-left px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${
                  activeChapter.id === chap.id 
                  ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                  : 'glass border-white/5 text-gray-500 hover:border-white/20'
                }`}
              >
                {chap.title}
              </button>
            ))}
          </div>

          {/* Área de Conteúdo */}
          <div className="lg:col-span-3 glass p-12 rounded-[3rem] border-blue-500/20 relative min-h-[400px]">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>

            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-bold font-grotesk mb-8 text-white flex items-center gap-4">
                <span className="text-blue-500 font-mono">0{CHAPTERS.indexOf(activeChapter) + 1}</span>
                {activeChapter.title}
              </h3>
              
              <div className="text-gray-400 leading-relaxed space-y-6 text-sm md:text-base">
                {activeChapter.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Rev", value: "2025.1" },
                  { label: "Sec", value: "AES-256" },
                  { label: "PoI", value: "v2.0" },
                  { label: "Status", value: "Final" }
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-[10px] text-gray-600 uppercase font-bold mb-1">{s.label}</div>
                    <div className="text-xs font-mono text-blue-400">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitepaperTerminal;
