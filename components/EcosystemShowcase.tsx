
import React from 'react';

const EcosystemShowcase: React.FC = () => {
  const apps = [
    {
      title: "BioInference DAO",
      category: "Biotecnologia",
      desc: "Usa o PoI para dobragem de proteínas descentralizada, acelerando a descoberta de curas.",
      icon: "🧬",
      color: "from-green-500 to-emerald-700"
    },
    {
      title: "AetherTrade Agent",
      category: "Finanças / DeFi",
      desc: "Agentes autônomos que executam swaps baseados em análise de sentimento global em milissegundos.",
      icon: "🤖",
      color: "from-blue-500 to-indigo-700"
    },
    {
      title: "NeuralCinema",
      category: "Mídia / Vídeo",
      desc: "Renderização de vídeos 4K por IA distribuída em milhares de nós domésticos.",
      icon: "🎬",
      color: "from-purple-500 to-pink-700"
    },
    {
      title: "Sentinel Privacy",
      category: "Cybersecurity",
      desc: "ZKP (Zero-Knowledge Proofs) aplicados a dados de treinamento de IA para privacidade absoluta.",
      icon: "🛡️",
      color: "from-amber-500 to-orange-700"
    }
  ];

  return (
    <div className="py-24 px-4 bg-black" id="ecosystem">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-grotesk font-extrabold text-white mb-4 uppercase tracking-tighter">O Ecossistema de <span className="text-blue-500">Utilidade</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Aetheris não é apenas um token; é a fundação para uma nova geração de aplicativos que exigem inteligência nativa on-chain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app, i) => (
            <div key={i} className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all group flex flex-col h-full">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-3xl mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                {app.icon}
              </div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{app.category}</div>
              <h3 className="text-xl font-bold text-white mb-4 font-grotesk">{app.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow">{app.desc}</p>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 transition-all">
                Explorar DApp
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 glass border-blue-500/30 text-blue-400 font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all uppercase text-xs tracking-widest">
            Construa seu DApp na AetherNet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EcosystemShowcase;
