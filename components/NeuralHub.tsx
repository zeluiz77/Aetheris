
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { processNeuralTask } from '../services/geminiService.ts';
import { Language } from '../services/i18n.ts';
import { backend } from '../services/backendService.ts';

interface NeuralHubProps {
  walletConnected: boolean;
  onConnect: () => void;
  lang: Language;
}

const NeuralHub: React.FC<NeuralHubProps> = ({ walletConnected, onConnect, lang }) => {
  const [task, setTask] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (walletConnected) {
      backend.getNeuralHistory().then(setHistory);
    }
  }, [walletConnected]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-3), `> ${new Date().toLocaleTimeString()} :: ${msg}`]);
  };

  const handleRunInference = async () => {
    if (!task.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setResult(null);
    addLog("ASSINANDO_TRANSAÇÃO_POI...");
    
    const response = await processNeuralTask(task, lang);
    
    // PERSISTÊNCIA NO BACKEND
    await backend.saveInference(task, response);
    const updatedHistory = await backend.getNeuralHistory();
    setHistory(updatedHistory);

    addLog("SUCESSO: $AETHR BURN CONFIRMADO");
    setResult(response);
    setIsProcessing(false);
  };

  return (
    <div className="py-24 px-4 bg-black relative" id="neural-hub">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-12">
          
          <div className="w-full md:w-1/2 flex flex-col">
            <h2 className="text-3xl font-grotesk font-black text-white uppercase tracking-tighter mb-8">Neural Hub <span className="text-cyan-500/50">Core</span></h2>

            <div className="glass p-8 rounded-[3rem] border-white/5 flex-1 flex flex-col bg-white/[0.02]">
              {!walletConnected ? (
                <div className="text-center py-20 flex-1 flex flex-col justify-center">
                  <p className="text-gray-500 mb-8 text-[10px] font-bold uppercase tracking-widest">Acesso Restrito</p>
                  <button onClick={onConnect} className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-cyan-50 transition-all uppercase text-xs tracking-widest">Identificar</button>
                </div>
              ) : (
                <>
                  <textarea 
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Comando de inferência..."
                    className="w-full h-40 bg-black/50 border border-white/10 rounded-3xl p-6 text-sm text-cyan-400 focus:outline-none focus:border-cyan-500/40 transition-all font-mono mb-6"
                  />
                  <button 
                    onClick={handleRunInference}
                    disabled={isProcessing || !task.trim()}
                    className="w-full py-5 bg-cyan-500 text-black font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] mb-6"
                  >
                    {isProcessing ? 'COMPUTANDO...' : 'EXECUTAR INFERÊNCIA'}
                  </button>
                  
                  <div className="mt-auto">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-4 tracking-widest">Últimas Atividades (Backend)</h4>
                    <div className="space-y-2">
                      {history.length === 0 && <p className="text-[10px] text-zinc-700 italic">Nenhuma inferência registrada.</p>}
                      {history.map((h, i) => (
                        <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 text-[9px] flex justify-between items-center group cursor-pointer" onClick={() => setResult(h.result)}>
                          <span className="text-gray-400 truncate w-3/4">{h.task}</span>
                          <span className="text-cyan-500 group-hover:underline">Ver Resultado</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className={`h-full min-h-[500px] glass rounded-[3rem] border-white/5 flex flex-col overflow-hidden ${result ? 'bg-cyan-500/[0.03] border-cyan-500/10' : ''}`}>
              {result ? (
                <div className="p-10 animate-in fade-in duration-700">
                  <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                     <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-30">
                  <h4 className="text-white font-bold uppercase tracking-widest mb-2 text-xs">Aguardando...</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralHub;
