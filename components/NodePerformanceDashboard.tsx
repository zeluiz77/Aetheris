
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { backend, UserProgress } from '../services/backendService.ts';

const NodePerformanceDashboard: React.FC = () => {
  const [data, setData] = useState<{time: string, yield: number}[]>([]);
  const [totalYield, setTotalYield] = useState(0);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const history = await backend.getYieldHistory();
      setData(history);
      setTotalYield(history.reduce((acc, curr) => acc + curr.yield, 0));
      const prog = await backend.getUserProgress();
      setProgress(prog);
    };
    loadData();
    
    // Refresh a cada compra ou mudança
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const xpPercent = progress ? Math.min(100, (progress.xp / progress.nextLevelXp) * 100) : 0;

  return (
    <div className="py-24 px-4 bg-black" id="dashboard">
      <div className="max-w-6xl mx-auto">
        
        {/* User Level Header */}
        <div className="glass p-10 rounded-[3.5rem] border-cyan-500/10 mb-12 flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-zinc-950 to-black">
           <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white/5 flex items-center justify-center relative">
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle 
                      cx="64" cy="64" r="60" 
                      fill="transparent" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      className="text-white/5"
                    />
                    <circle 
                      cx="64" cy="64" r="60" 
                      fill="transparent" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      strokeDasharray="377"
                      strokeDashoffset={377 - (377 * xpPercent) / 100}
                      className="text-cyan-500 transition-all duration-1000"
                    />
                 </svg>
                 <div className="text-center z-10">
                    <div className="text-[10px] text-gray-500 font-black uppercase">Nível</div>
                    <div className="text-4xl font-black text-white">{progress?.level || 1}</div>
                 </div>
              </div>
           </div>

           <div className="flex-1 space-y-6">
              <div className="flex justify-between items-end">
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Status do <span className="text-cyan-500">Operador</span></h3>
                    <p className="text-[10px] text-gray-500 uppercase font-mono mt-1">Sua influência na rede cresce com o tempo</p>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] text-gray-500 uppercase font-black">Experiência Neural</div>
                    <div className="text-white font-mono text-sm">{progress?.xp.toFixed(0)} / {progress?.nextLevelXp} XP</div>
                 </div>
              </div>
              
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-cyan-500 transition-all duration-1000" style={{ width: `${xpPercent}%` }}></div>
              </div>

              <div className="flex flex-wrap gap-4">
                 <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Prestigio:</span>
                    <span className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">{progress?.level! >= 5 ? 'ARQUITETO' : 'INICIADO'}</span>
                 </div>
                 <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Bonus Staking:</span>
                    <span className="text-[10px] text-green-500 font-black uppercase">+{((progress?.level || 1) * 2)}%</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-grotesk font-black text-white uppercase tracking-tighter">Performance do <span className="text-cyan-500">Nó</span></h2>
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">Métricas de rendimento neural em tempo real</p>
          </div>
          <div className="flex gap-4">
             <div className="glass px-6 py-4 rounded-3xl border-cyan-500/20 text-center min-w-[140px]">
                <div className="text-[9px] text-gray-500 uppercase font-black mb-1">Rendimento Total</div>
                <div className="text-xl font-bold text-white">{totalYield.toFixed(2)} <span className="text-[10px] text-cyan-500">$AETHR</span></div>
             </div>
             <div className="glass px-6 py-4 rounded-3xl border-purple-500/20 text-center min-w-[140px]">
                <div className="text-[9px] text-gray-500 uppercase font-black mb-1">Status do Nó</div>
                <div className="text-xl font-bold text-green-500 flex items-center justify-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   ATIVO
                </div>
             </div>
          </div>
        </div>

        <div className="glass rounded-[3.5rem] p-10 border-white/5 bg-zinc-950/50 relative overflow-hidden">
          <div className="h-[350px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#444" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#444" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="yield" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" animationDuration={2000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodePerformanceDashboard;
