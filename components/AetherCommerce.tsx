
import React, { useState } from 'react';

const AetherCommerce: React.FC = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [processing, setProcessing] = useState(false);

  const simulatePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setIsPaid(true);
    }, 3000);
  };

  return (
    <div className="py-24 px-4 bg-black" id="commerce">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
            <h2 className="text-5xl font-grotesk font-extrabold text-white mb-6 uppercase tracking-tighter leading-none">Aether <span className="text-emerald-400">Pay</span></h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Adoção é utilidade. Nosso terminal de pagamento permite que qualquer estabelecimento aceite $AETHR com liquidação instantânea e taxas 90% menores que os cartões tradicionais.
            </p>
            <ul className="space-y-4 mb-10">
              {['Liquidação em 2 segundos', 'Proteção contra volatilidade', 'Fidelidade integrada via DAO'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-[10px]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-8 rounded-[3rem] border-emerald-500/20 bg-emerald-950/5 relative">
            <div className="bg-black/60 rounded-[2rem] p-8 border border-white/5">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-white font-bold">Inference Server #402</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-mono">ID: 0x9f...221</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">450 $AETHR</div>
                  <div className="text-[10px] text-emerald-400 font-bold">~ $12.40 USD</div>
                </div>
              </div>

              <div className="aspect-square w-48 mx-auto bg-white p-4 rounded-3xl mb-8 relative group cursor-pointer" onClick={simulatePayment}>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=aetheris:0xacaa...AB21?amount=450`} 
                  alt="QR Code" 
                  className={`w-full h-full transition-all ${processing ? 'opacity-20' : ''}`}
                />
                {processing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {isPaid && (
                  <div className="absolute inset-0 bg-emerald-500 flex flex-col items-center justify-center rounded-3xl animate-in zoom-in">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-white font-bold mt-2 text-xs">PAGO!</span>
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="text-[10px] text-gray-500 font-mono mb-4">ESCANEIE COM A CARTEIRA AETHERIS</p>
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AetherCommerce;
