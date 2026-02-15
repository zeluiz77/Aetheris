
import React, { useState, useEffect } from 'react';
import { backend, ProtocolStats } from '../services/backendService.ts';

const StatusBar: React.FC = () => {
  const [metrics, setMetrics] = useState<ProtocolStats>(backend.getStats());
  const [cloudStatus, setCloudStatus] = useState(backend.isCloudActive);

  useEffect(() => {
    return backend.subscribe((newStats) => {
      setMetrics(newStats);
      setCloudStatus(backend.isCloudActive);
    });
  }, []);

  return (
    <div className="fixed bottom-0 w-full z-[100] bg-black/90 backdrop-blur-2xl border-t border-white/5 px-6 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor] ${cloudStatus ? 'bg-green-500 text-green-500' : 'bg-cyan-500 text-cyan-500'}`}></span>
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
              {cloudStatus ? 'Cloud Sync Active' : 'Sandbox Mode'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-400 uppercase">Block:</span>
            <span className="text-[10px] font-mono font-bold text-white">#{metrics.height}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-400 uppercase">Neural Load:</span>
            <span className={`text-[10px] font-mono font-black ${metrics.neuralLoad > 80 ? 'text-amber-500' : 'text-cyan-400'}`}>{metrics.neuralLoad}%</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-400 uppercase">AETHR/USD:</span>
            <span className="text-[10px] font-mono font-bold text-white">${metrics.price.toFixed(4)}</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
             <span className="text-[9px] font-mono text-gray-400 uppercase">Supply Burned:</span>
             <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-1000" style={{ width: `${(metrics.burned % 100)}%` }}></div>
             </div>
             <span className="text-[9px] font-mono font-bold text-cyan-500">{metrics.burned.toFixed(1)}k</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-400 uppercase">Latency:</span>
            <span className="text-[10px] font-mono font-bold text-green-400">12ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
