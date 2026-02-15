
import React, { useState, useEffect } from 'react';
import { backend, Proposal } from '../services/backendService.ts';

const DAOGovernance: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [votingId, setVotingId] = useState<string | null>(null);

  useEffect(() => {
    loadProposals();
  }, []);

  const loadProposals = async () => {
    const data = await backend.getProposals();
    setProposals(data);
  };

  const handleVote = async (id: string, vote: 'yes' | 'no') => {
    setVotingId(id);
    await backend.castVote(id, vote);
    await loadProposals(); // Recarrega para mostrar o novo estado
    setVotingId(null);
  };

  return (
    <div className="py-24 px-4 bg-black border-t border-white/5" id="governance">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 className="text-4xl font-grotesk font-bold text-white mb-4 uppercase tracking-tighter">Aetheris <span className="text-green-500">DAO</span></h2>
            <p className="text-gray-500 max-w-xl">O código é a lei, mas a comunidade é o juiz. Vote no futuro da Inteligência Descentralizada.</p>
          </div>
          <button className="px-6 py-3 bg-white text-black font-bold rounded-xl text-xs uppercase tracking-widest hover:invert transition-all">Criar Proposta</button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {proposals.map((p) => (
            <div key={p.id} className="glass p-8 rounded-[2.5rem] border-white/5 group hover:border-green-500/20 transition-all relative overflow-hidden">
              {votingId === p.id && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono text-gray-500">{p.id}</span>
                <span className={`px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest ${
                  p.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/30' : 'bg-zinc-800 text-zinc-500'
                }`}>
                  {p.status}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-4 leading-tight group-hover:text-green-400 transition-colors">{p.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-8">{p.desc}</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                    <span className="text-green-500">Sim ({p.votesFor})</span>
                    <span className="text-red-500">Não ({p.votesAgainst})</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                    {/* Barra de progresso baseada em porcentagem simples */}
                    <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${(p.votesFor / (p.votesFor + p.votesAgainst + 0.1)) * 100}%` }}></div>
                    <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${(p.votesAgainst / (p.votesFor + p.votesAgainst + 0.1)) * 100}%` }}></div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleVote(p.id, 'yes')}
                    className="flex-1 py-3 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-black border border-green-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    Votar Sim
                  </button>
                  <button 
                    onClick={() => handleVote(p.id, 'no')}
                    className="flex-1 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-black border border-red-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    Votar Não
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-10 glass rounded-[3rem] border-green-500/10 bg-green-950/5 flex flex-col md:flex-row items-center gap-10">
          <div className="shrink-0 w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <h4 className="text-xl font-bold font-grotesk mb-3">Poder de Voto Baseado em Convicção</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Diferente de DAOs tradicionais, a Aetheris utiliza **Conviction Voting**. Quanto mais tempo você mantém seus tokens em stake na proposta, mais peso seu voto ganha.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAOGovernance;
