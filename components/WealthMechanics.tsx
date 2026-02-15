
import React from 'react';

const WealthMechanics: React.FC = () => {
  const mechanisms = [
    {
      title: "Valorização Patrimonial",
      desc: "Mecanismo de 'Buy-back & Burn'. O lucro da rede é usado para comprar $AETHR no mercado e queimar, reduzindo o supply e pressionando o preço para cima.",
      roi: "Alto Potencial",
      icon: "📈"
    },
    {
      title: "Renda Passiva (Yield)",
      desc: "Recompensas de Staking de até 15% ao ano. Seus tokens trabalham para você enquanto a rede processa trilhões de cálculos de IA.",
      roi: "Recorrente",
      icon: "💰"
    },
    {
      title: "Efeito de Rede (Metcalfe)",
      desc: "Quanto mais desenvolvedores usam a AetherNet, mais valioso o token se torna. O valor da rede cresce ao quadrado do número de usuários.",
      roi: "Exponencial",
      icon: "🌐"
    },
    {
      title: "Airdrops Exclusivos",
      desc: "Acesso prioritário a tokens de novos sub-projetos de IA lançados na Layer 2. Multiplicação de portfólio sem custo adicional.",
      roi: "Diversificado",
      icon: "🎁"
    }
  ];

  return (
    <div className="py-24 px-4 bg-gradient-to-b from-black to-blue-950/20" id="wealth">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold mb-6">Engenharia de Riqueza</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A Aetheris não é apenas um ativo; é um sistema de captura de valor projetado para transferir a riqueza da revolução da IA para os detentores do protocolo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mechanisms.map((m, i) => (
            <div key={i} className="glass p-8 rounded-[2rem] border-white/5 hover:border-blue-400/30 transition-all hover:-translate-y-2 duration-300">
              <div className="text-4xl mb-6">{m.icon}</div>
              <h3 className="text-xl font-bold font-grotesk mb-2">{m.title}</h3>
              <div className="inline-block px-2 py-1 bg-blue-500/10 rounded text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-4">
                ROI: {m.roi}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            💎
          </div>
          <div>
            <h4 className="text-xl font-bold font-grotesk mb-2">A Visão do Arquiteto sobre Fortunas</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              "Para ficar rico com cripto, você deve parar de perseguir o preço e começar a perseguir a <strong>utilidade</strong>. O $AETHR é valioso porque ele é o combustível obrigatório para a IA descentralizada. Quem controla o combustível, controla a riqueza da nova era industrial."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WealthMechanics;
