
import React, { useState, useEffect } from 'react';
import { backend, NeuralModule } from '../services/backendService.ts';

const AetherStore: React.FC<{ walletConnected: boolean }> = ({ walletConnected }) => {
  const [modules, setModules] = useState<NeuralModule[]>([]);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [isBuying, setIsBuying] = useState<string | null>(null);

  useEffect(() => {
    backend.getMarketplaceModules().then(setModules);
    backend.getPurchasedIds().then(setPurchasedIds);
  }, [walletConnected]);

  const handlePurchase = async (moduleId: string) => {
    if (!walletConnected) return;
    setIsBuying(moduleId);
    
    // Simula delay de confirmação na blockchain
    await new Promise(r => setTimeout(r, 1500));
    
    const success = await backend.purchaseModule(moduleId);
    if (success) {
      const updated = await backend.getPurchasedIds();
      setPurchasedIds(updated);
    }
    setIsBuying(null);
  };

  return (
    <div className="py-24 px-4 bg-black border-y border-white/5" id="store">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 className="text-4xl font-grotesk font-black text-white mb-2 uppercase tracking-tighter italic">Neural <span className="text-cyan-400">Store</span></h2>
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">Adquira extensões de inteligência para seu nó</p>
          </div>
          <div className="glass px-6 py-3 rounded-2xl border-cyan-500/20">
             <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Seu Inventário</span>
             <span className="text-white font-bold text-lg">{purchasedIds.length} MÓDULOS</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod) => {
            const isOwned = purchasedIds.includes(mod.id);
            const processing = isBuying === mod.id;

            return (
              <div key={mod.id} className={`glass p-8 rounded-[2.5rem] border-white/5 flex flex-col h-full transition-all group ${isOwned ? 'opacity-60 border-green-500/20' : 'hover:border-cyan-500/30 hover:-translate-y-2'}`}>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full">{mod.category}</span>
                  {isOwned && <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Adquirido</span>}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{mod.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-8 flex-grow">{mod.desc}</p>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">Preço</span>
                    <span className="text-lg font-black text-white">{mod.price} <span className="text-[10px] text-cyan-500">$AETHR</span></span>
                  </div>
                  
                  <button 
                    onClick={() => handlePurchase(mod.id)}
                    disabled={!walletConnected || isOwned || processing}
                    className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      isOwned 
                      ? 'bg-zinc-800 text-zinc-500 cursor-default' 
                      : 'bg-white text-black hover:bg-cyan-400 shadow-xl active:scale-95 disabled:opacity-20'
                    }`}
                  >
                    {processing ? 'SINCRONIZANDO...' : isOwned ? 'ATIVO NO NÓ' : 'ADQUIRIR MÓDULO'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 glass rounded-[3rem] border-white/5 bg-zinc-900/20 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-2xl border border-cyan-500/20">🔥</div>
              <div>
                <h4 className="text-lg font-bold">Mecanismo de Deflação</h4>
                <p className="text-xs text-gray-500">10% de cada compra no Marketplace é permanentemente queimada para manter a escassez do $AETHR.</p>
              </div>
           </div>
           <button className="px-8 py-3 glass border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Listar DApp</button>
        </div>
      </div>
    </div>
  );
};

export default AetherStore;
