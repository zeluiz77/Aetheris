
import React, { useState } from 'react';

const CrossBridge: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [fromChain, setFromChain] = useState('Ethereum');
  const [toChain, setToChain] = useState('AetherNet');
  const [isBridging, setIsBridging] = useState(false);

  const startBridge = () => {
    setIsBridging(true);
    setTimeout(() => setIsBridging(false), 4000);
  };

  return (
    <div className="py-24 px-4 bg-zinc-950/80" id="bridge">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-grotesk font-extrabold text-white mb-4 uppercase tracking-tighter">Nexo <span className="text-blue-400">Cross-Chain</span></h2>
          <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">Fluidez total: O $AETHR não conhece fronteiras</p>
        </div>

        <div className="glass p-10 rounded-[3rem] border-white/5 bg-gradient-to-br from-blue-950/10 to-transparent">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* From */}
            <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
              <label className="text-[10px] font-bold text-gray-500 uppercase mb-4 block">Origem</label>
              <select 
                value={fromChain}
                onChange={(e) => setFromChain(e.target.value)}
                className="w-full bg-transparent text-white font-bold outline-none mb-4"
              >
                <option value="Ethereum">Ethereum L1</option>
                <option value="Solana">Solana</option>
                <option value="AetherNet">AetherNet L2</option>
              </select>
              <input 
                type="number" 
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-blue-400 font-mono"
              />
            </div>

            {/* Animation Arrow */}
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full border-2 border-blue-500/30 flex items-center justify-center ${isBridging ? 'animate-spin' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </div>
              <span className="text-[9px] font-mono text-blue-500/50 mt-4">VALIDANDO BRIDGE...</span>
            </div>

            {/* To */}
            <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
              <label className="text-[10px] font-bold text-gray-500 uppercase mb-4 block">Destino</label>
              <select 
                value={toChain}
                onChange={(e) => setToChain(e.target.value)}
                className="w-full bg-transparent text-white font-bold outline-none mb-4"
              >
                <option value="AetherNet">AetherNet L2</option>
                <option value="Ethereum">Ethereum L1</option>
                <option value="Solana">Solana</option>
              </select>
              <div className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-gray-500 font-mono">
                {amount ? (parseFloat(amount) * 0.998).toFixed(4) : '0.0000'}
              </div>
            </div>
          </div>

          <button 
            onClick={startBridge}
            disabled={isBridging || !amount}
            className="w-full mt-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-2xl disabled:opacity-30 uppercase tracking-widest text-xs"
          >
            {isBridging ? 'TRANSPASSANDO REDES...' : 'INICIAR TRANSFERÊNCIA'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrossBridge;
