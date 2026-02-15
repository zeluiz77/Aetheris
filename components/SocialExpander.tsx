
import React, { useState } from 'react';

const SocialExpander: React.FC = () => {
  const [referrals, setReferrals] = useState(12);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateInvite = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, 1500);
  };

  return (
    <div className="py-24 px-4 bg-zinc-950" id="expansion">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
              Mecanismo de Prova de Atenção
            </div>
            <h2 className="text-5xl font-grotesk font-extrabold text-white mb-6 uppercase tracking-tighter leading-none">
              Nexo de <span className="text-blue-500">Expansão</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              O mundo fica sabendo da Aetheris através de você. Ao expandir a rede, você não apenas atrai novos validadores, mas aumenta seu multiplicador de recompensas de staking. Isso é <strong>Social Mining</strong>.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="glass p-6 rounded-3xl border-white/5">
                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Rede Expandida</div>
                <div className="text-3xl font-bold text-white">+{referrals} <span className="text-xs text-blue-500">NÓS</span></div>
              </div>
              <div className="glass p-6 rounded-3xl border-white/5">
                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Boost de Staking</div>
                <div className="text-3xl font-bold text-green-500">x1.25</div>
              </div>
            </div>

            <button 
              onClick={generateInvite}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              {isGenerating ? 'CRIPTOGRAFANDO NEXUS...' : copied ? 'CONVITE COPIADO!' : 'GERAR CONVITE DE EXPANSÃO'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full"></div>
            <div className="glass p-8 rounded-[3rem] border-blue-500/20 bg-blue-950/5 relative overflow-hidden">
              <div className="aspect-square w-full relative">
                <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500/20">
                  {/* Central Node */}
                  <circle cx="100" cy="100" r="10" className="fill-blue-500 animate-pulse" />
                  {/* Outer Nodes */}
                  {[
                    { x: 50, y: 50 }, { x: 150, y: 50 }, { x: 50, y: 150 }, { x: 150, y: 150 },
                    { x: 100, y: 30 }, { x: 100, y: 170 }, { x: 30, y: 100 }, { x: 170, y: 100 }
                  ].map((pos, i) => (
                    <g key={i}>
                      <line x1="100" y1="100" x2={pos.x} y2={pos.y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" />
                      <circle cx={pos.x} cy={pos.y} r="4" className={`fill-blue-500/40 ${i < referrals ? 'opacity-100 animate-bounce' : 'opacity-20'}`} style={{ animationDelay: `${i * 0.1}s` }} />
                    </g>
                  ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[10px] font-mono text-blue-400 tracking-[0.3em] uppercase mb-1">Status Viral</div>
                    <div className="text-2xl font-black text-white italic">ONIPRESENÇA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialExpander;
