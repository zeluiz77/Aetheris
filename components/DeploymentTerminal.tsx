
import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  category: string;
  label: string;
  command: string;
  status: 'pending' | 'completed';
}

const DeploymentTerminal: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', category: 'SMART CONTRACTS', label: 'Compilar Contratos (Foundry)', command: 'forge build --optimize', status: 'completed' },
    { id: '2', category: 'SMART CONTRACTS', label: 'Deploy em Sepolia Testnet', command: 'forge script script/DeployAetheris.s.sol --rpc-url $SEPOLIA_RPC', status: 'completed' },
    { id: '3', category: 'INFRASTRUCTURE', label: 'Configurar Nó Validador PoI', command: 'docker-compose up aether-node', status: 'pending' },
    { id: '4', category: 'LEGAL', label: 'Registrar Fundação Web3', command: 'sh setup_foundation_entity.sh', status: 'pending' },
    { id: '5', category: 'MARKETING', label: 'Deploy do Portal Genesis', command: 'vercel deploy --prod', status: 'pending' },
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t));
  };

  const progress = Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100);
  const isComplete = progress === 100;

  return (
    <div className={`mt-12 bg-black rounded-3xl border transition-all duration-700 overflow-hidden shadow-2xl ${isComplete ? 'border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.2)]' : 'border-white/10'}`}>
      <div className={`px-6 py-4 flex items-center justify-between border-b transition-colors ${isComplete ? 'bg-green-950/30 border-green-500/20' : 'bg-zinc-900 border-white/5'}`}>
        <div className="flex gap-2">
          <div className={`w-3 h-3 rounded-full border ${isComplete ? 'bg-green-500 border-green-400 animate-pulse' : 'bg-red-500/20 border-red-500/50'}`}></div>
          <div className={`w-3 h-3 rounded-full border ${isComplete ? 'bg-green-500 border-green-400 animate-pulse' : 'bg-yellow-500/20 border-yellow-500/50'}`}></div>
          <div className={`w-3 h-3 rounded-full border ${isComplete ? 'bg-green-500 border-green-400 animate-pulse' : 'bg-green-500/20 border-green-500/50'}`}></div>
        </div>
        <div className="text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase">
          {isComplete ? 'PROTOCOL_SUCCESS_PHOENIX_REACHED' : 'Aetheris-Mainnet-Launcher v1.0'}
        </div>
        <div className="w-10"></div>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className={`text-xs font-mono ${isComplete ? 'text-green-400' : 'text-cyan-500'}`}>
              {isComplete ? 'CONTRATO VERIFICADO NA REDE' : 'PRONTIDÃO DO LANÇAMENTO'}
            </span>
            <span className={`text-xl font-mono ${isComplete ? 'text-green-400' : 'text-white'}`}>{progress}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 ease-out ${isComplete ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => toggleTask(task.id)}
              className={`group cursor-pointer p-4 rounded-xl border transition-all ${
                task.status === 'completed' 
                ? 'bg-green-500/5 border-green-500/30' 
                : 'bg-white/5 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-white/20'
                  }`}>
                    {task.status === 'completed' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">{task.category}</span>
                </div>
                <span className={`text-[10px] font-mono ${task.status === 'completed' ? 'text-green-400' : 'text-gray-600'}`}>
                  {task.status === 'completed' ? 'EXECUTADO' : 'AGUARDANDO'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm font-bold ${task.status === 'completed' ? 'text-white' : 'text-gray-400'}`}>{task.label}</span>
                <code className="text-[10px] bg-black/50 px-2 py-1 rounded text-cyan-500/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  {task.command}
                </code>
              </div>
            </div>
          ))}
        </div>

        {isComplete ? (
          <div className="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl animate-in zoom-in-95">
            <h4 className="text-green-400 font-bold text-sm mb-2 flex items-center gap-2">
               <span>🎉</span> CONTRATO ATIVO NA SEPOLIA
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              O contrato foi verificado com sucesso. Você já pode interagir com as funções <code>calculateFee</code> e <code>processAITask</code> diretamente pelo Etherscan.
            </p>
            <a 
              href="https://sepolia.etherscan.io/address/0xacaa6dd98e12966cbfC64A2a455383a5F32aAB21" 
              target="_blank" 
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-black font-bold text-[10px] px-4 py-2 rounded-lg transition-all"
            >
              ABRIR NO ETHERSCAN
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        ) : (
          <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
            <div className="flex gap-3">
              <div className="text-blue-500">ℹ</div>
              <p className="text-xs text-blue-300/80 leading-relaxed">
                <strong>Próximo Passo:</strong> Marque as tarefas acima para simular a progressão do ecossistema Aetheris.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentTerminal;
