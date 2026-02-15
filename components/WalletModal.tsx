
import React from 'react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string) => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  if (!isOpen) return null;

  const providers = [
    { name: 'MetaMask', icon: '🦊', desc: 'Nativo Browser' },
    { name: 'Coinbase', icon: '🔵', desc: 'Secure Storage' },
    { name: 'WalletConnect', icon: '🌐', desc: 'Mobile Link' },
    { name: 'AetherVault', icon: '💎', desc: 'Cold Storage' }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="glass w-full max-w-md rounded-[3rem] border-cyan-500/20 p-10 relative overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        
        <h3 className="text-2xl font-grotesk font-black text-white mb-2 uppercase tracking-tighter">Gateway Connect</h3>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-8 font-mono">Selecione seu provedor de custódia</p>

        <div className="space-y-3">
          {providers.map((p) => (
            <button 
              key={p.name}
              onClick={() => onConnect(`0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`)}
              className="w-full group flex items-center justify-between p-5 glass border-white/5 hover:border-cyan-500/30 rounded-2xl transition-all hover:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">{p.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-bold text-white uppercase">{p.name}</div>
                  <div className="text-[9px] text-gray-500 font-mono">{p.desc}</div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-500 transition-colors">
                <div className="w-1.5 h-1.5 bg-white group-hover:bg-cyan-500 rounded-full"></div>
              </div>
            </button>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-8 py-4 text-[9px] font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-[0.3em]"
        >
          Abortar Conexão
        </button>
      </div>
    </div>
  );
};

export default WalletModal;
