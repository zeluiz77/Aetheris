
import React, { useState, useEffect } from 'react';
import AetherisLogo from './AetherisLogo.tsx';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[95vh] flex flex-col justify-center">
      {/* Luzes de Fundo Ambientais */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-cyan-600/10 blur-[180px] rounded-full -z-10 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-cyan-500/20 animate-in fade-in slide-in-from-left-4 duration-1000">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Mainnet Gênese Ativa</span>
          </div>

          <h1 className="text-7xl md:text-[120px] font-grotesk font-black mb-8 tracking-tighter leading-[0.8] text-white">
            AETHERIS <br/>
            <span className="gradient-text drop-shadow-[0_0_40px_rgba(34,211,238,0.4)]">$AETHR</span>
          </h1>
          
          <p className="max-w-xl text-xl text-gray-400 mb-12 leading-relaxed mx-auto lg:mx-0 font-medium border-l-2 border-cyan-500/20 pl-6">
            O despertar da <span className="text-white">Soberania Algorítmica</span>. 
            Uma infraestrutura de ouro digital lapidada pela inteligência descentralizada.
          </p>

          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <button className="px-12 py-6 bg-white text-black font-black rounded-2xl hover:bg-cyan-50 transition-all shadow-[0_25px_50px_rgba(255,255,255,0.15)] active:scale-95 text-sm uppercase tracking-widest relative overflow-hidden group">
              <span className="relative z-10">Adquirir $AETHR</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
            <button className="px-12 py-6 glass text-white font-black rounded-2xl hover:bg-white/10 transition-all border-white/10 text-sm uppercase tracking-widest">
              Explorar Protocolo
            </button>
          </div>
        </div>

        {/* CONTAINER DA LOGO - O CENTRO DE GRAVIDADE */}
        <div className="flex-1 relative flex items-center justify-center py-20">
          <div className="absolute w-[150%] h-[150%] bg-cyan-500/5 blur-[120px] rounded-full animate-pulse"></div>
          
          <div 
            className="relative group transition-transform duration-300 ease-out"
            style={{ 
              transform: `perspective(1000px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
            }}
          >
            <div className="glass p-12 rounded-[5rem] border-cyan-500/30 shadow-[0_0_120px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_160px_rgba(6,182,212,0.4)] transition-all duration-1000 relative animate-levitate bg-black/40 backdrop-blur-3xl">
              <AetherisLogo size="xl" />
              <div className="text-center mt-8">
                 <span className="text-lg font-mono text-cyan-400 tracking-[1em] font-bold">AETHERIS</span>
              </div>
            </div>

            {/* Sombra de Contato Dinâmica */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-cyan-500/20 blur-3xl rounded-[100%] animate-shadow-pulse"></div>

            {/* Badges Flutuantes */}
            <div className="absolute -top-10 -right-10 glass px-6 py-3 rounded-2xl border-cyan-500/40 animate-float-slow backdrop-blur-xl z-30 shadow-2xl">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">Inference Core</span>
                <span className="text-lg font-black text-white">ONLINE</span>
              </div>
            </div>
            
            <div className="absolute -bottom-5 -left-10 glass px-6 py-3 rounded-2xl border-amber-500/40 animate-float-slow-reverse backdrop-blur-xl z-30 shadow-2xl">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-widest">Asset Value</span>
                <span className="text-lg font-black text-white">$2.4B TVL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes levitate {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(1deg); }
        }
        @keyframes shadow-pulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
          50% { transform: translateX(-50%) scale(0.6); opacity: 0.2; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -20px); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-10px, 20px); }
        }
        .animate-levitate { animation: levitate 6s ease-in-out infinite; }
        .animate-shadow-pulse { animation: shadow-pulse 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float-slow-reverse 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Hero;
