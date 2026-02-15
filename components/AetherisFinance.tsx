
import React, { useState, useEffect } from 'react';
import { simulateTransaction } from '../services/web3Service.ts';
import { backend } from '../services/backendService.ts';

interface TransactionStatus {
  step: 'idle' | 'approving' | 'staking' | 'success';
  hash?: string;
}

const AetherisFinance: React.FC<{ walletConnected: boolean }> = ({ walletConnected }) => {
  const [swapAmount, setSwapAmount] = useState('');
  const [stakingAmount, setStakingAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [yieldEarned, setYieldEarned] = useState(0);
  const [txStatus, setTxStatus] = useState<TransactionStatus>({ step: 'idle' });
  const [balance, setBalance] = useState('0.00');
  const [stakedBalance, setStakedBalance] = useState(0);

  useEffect(() => {
    if (walletConnected) {
      const loadBalances = async () => {
        const staked = await backend.getStakingBalance();
        setStakedBalance(staked);
        setBalance((Math.random() * 2500 + 500).toFixed(2));
      };
      
      loadBalances();

      const interval = setInterval(() => {
        setYieldEarned(prev => prev + 0.000042);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [walletConnected]);

  const handleStake = async () => {
    if (!stakingAmount || parseFloat(stakingAmount) <= 0) return;
    
    setTxStatus({ step: 'approving' });
    await new Promise(r => setTimeout(r, 1200));
    
    setTxStatus({ step: 'staking' });
    const hash = await simulateTransaction('stake', stakingAmount) as string;
    
    // PERSISTÊNCIA NO BACKEND
    await backend.saveStakingBalance(parseFloat(stakingAmount));
    const newStaked = await backend.getStakingBalance();
    setStakedBalance(newStaked);
    
    setTxStatus({ step: 'success', hash });
    setStakingAmount('');
    setTimeout(() => setTxStatus({ step: 'idle' }), 5000);
  };

  const handleSwap = async () => {
    setIsSwapping(true);
    await simulateTransaction('swap', swapAmount);
    setIsSwapping(false);
    setSwapAmount('');
  };

  return (
    <div className="py-24 px-4 bg-zinc-950" id="finance">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl font-grotesk font-bold text-white mb-4 uppercase tracking-tighter">Aetheris <span className="text-purple-500">Finance</span></h2>
            <p className="text-gray-500 italic">"Gerencie seu capital na camada de liquidez neural."</p>
          </div>
          {walletConnected && (
            <div className="text-right glass p-4 rounded-2xl border-white/5">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Total em Stake (Backend Verified)</div>
              <div className="text-2xl font-bold text-cyan-400">{stakedBalance.toLocaleString()} <span className="text-xs text-white">$AETHR</span></div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* DEX Swap UI */}
          <div className="glass p-8 rounded-[3rem] border-purple-500/20 relative overflow-hidden bg-white/[0.01]">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 uppercase tracking-widest text-sm">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              Neural Swap v2
            </h3>

            <div className="space-y-4">
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase mb-2">
                  <span>De</span>
                  <span>Saldo: 1.25 ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <input 
                    type="number" 
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                    placeholder="0.0"
                    className="bg-transparent text-2xl font-bold text-white outline-none w-1/2"
                  />
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="font-bold text-sm">ETH</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase mb-2">
                  <span>Para (Estimado)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {swapAmount ? (parseFloat(swapAmount) * 45200).toLocaleString() : '0.00'}
                  </div>
                  <span className="font-bold text-sm">AETHR</span>
                </div>
              </div>

              <button 
                onClick={handleSwap}
                disabled={!walletConnected || !swapAmount || isSwapping}
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl transition-all shadow-xl disabled:opacity-20 mt-4 uppercase tracking-[0.2em] text-[10px]"
              >
                {isSwapping ? 'Processando...' : 'Trocar agora'}
              </button>
            </div>
          </div>

          {/* Staking UI */}
          <div className="glass p-8 rounded-[3rem] border-blue-500/20 bg-white/[0.01] relative overflow-hidden">
            {txStatus.step !== 'idle' && (
              <div className="absolute inset-0 bg-black/95 z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                {txStatus.step === 'success' ? (
                  <>
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h4 className="text-xl font-bold mb-2">SINCRONIZADO!</h4>
                    <p className="text-[10px] text-gray-500 font-mono mb-6">ESTADO SALVO NO BACKEND</p>
                    <button onClick={() => setTxStatus({ step: 'idle' })} className="px-8 py-3 bg-white text-black font-bold rounded-xl text-xs uppercase">Ok</button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <h4 className="text-xl font-bold mb-2 uppercase animate-pulse">Atualizando Backend...</h4>
                  </>
                )}
              </div>
            )}

            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 uppercase tracking-widest text-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Neural Vault
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Quantia para Stake</label>
                <input 
                  type="number" 
                  value={stakingAmount}
                  onChange={(e) => setStakingAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-xl font-bold text-white outline-none w-full"
                />
              </div>

              <div className="bg-black/40 p-6 rounded-3xl border border-blue-500/10 text-center">
                <div className="text-4xl font-mono font-bold text-white mb-1">
                  {yieldEarned.toFixed(6)}
                </div>
                <div className="text-[9px] text-blue-400 font-bold uppercase tracking-[0.2em]">Rendimento Acumulado</div>
              </div>

              <button 
                onClick={handleStake}
                disabled={!walletConnected || !stakingAmount || parseFloat(stakingAmount) <= 0}
                className="w-full py-5 bg-blue-600/10 border border-blue-500/40 text-blue-400 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all uppercase text-[10px] tracking-[0.3em]"
              >
                Confirmar Stake
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AetherisFinance;
