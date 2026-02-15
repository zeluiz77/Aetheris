
import React from 'react';

const SecuritySection: React.FC = () => {
  return (
    <div className="py-24 px-4 bg-black" id="security">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-grotesk font-bold mb-4">Arquitetura de Segurança</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A AetherNet foi projetada com uma mentalidade de "segurança em primeiro lugar", combinando consenso inovador com rigor matemático.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Proof of Inference & 51% Attack Prevention */}
          <div className="glass p-10 rounded-[2.5rem] border-blue-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            </div>
            
            <h3 className="text-2xl font-bold font-grotesk mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm">01</span>
              Proof of Inference (PoI)
            </h3>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Diferente do Proof of Work ou Stake, o PoI exige que os validadores executem tarefas de inferência de IA reais para validar o estado da rede.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="font-bold text-blue-400 mb-2">Imunidade a Ataques de 51%</h4>
                <p className="text-sm text-gray-400">
                  Um atacante precisaria controlar a maioria absoluta do poder de computação neural especializado (GPUs/TPUs) global, não apenas capital. O custo de hardware torna o ataque financeiramente impossível.
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="font-bold text-blue-400 mb-2">Slashing de Verificação</h4>
                <p className="text-sm text-gray-400">
                  Respostas de IA são verificadas de forma determinística por nós vizinhos. Qualquer tentativa de "fake inference" resulta na perda imediata do stake do validador.
                </p>
              </div>
            </div>
          </div>

          {/* Smart Contract Security */}
          <div className="glass p-10 rounded-[2.5rem] border-purple-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>

            <h3 className="text-2xl font-bold font-grotesk mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-sm">02</span>
              Integridade On-chain
            </h3>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Nossa camada de aplicação é protegida por múltiplos protocolos de verificação para garantir que o código seja a lei suprema.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="font-bold text-purple-400 mb-2">Verificação Formal</h4>
                <p className="text-sm text-gray-400">
                  Contratos core são submetidos a provas matemáticas de correção, eliminando logicamente bugs de reentrada, overflow e manipulação de estado.
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="font-bold text-purple-400 mb-2">Timelocks & Multi-sig</h4>
                <p className="text-sm text-gray-400">
                  Mudanças no protocolo exigem 72h de delay e aprovação de 7-de-10 assinaturas distribuídas, prevenindo mudanças maliciosas repentinas (Rug Pull Protection).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
