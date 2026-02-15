
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TOKENOMICS_DATA } from '../constants';

const TokenomicsChart: React.FC = () => {
  return (
    <div className="py-20 px-4 bg-zinc-950/50" id="tokenomics">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-grotesk font-bold mb-4">Tokenomics Sustentável</h2>
          <p className="text-gray-400">Distribuição projetada para crescimento de longo prazo e descentralização real.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TOKENOMICS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {TOKENOMICS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-grotesk">Lógica Econômica</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center shrink-0">🔥</div>
                <div>
                  <h4 className="font-bold">Mecanismo de Queima</h4>
                  <p className="text-sm text-gray-400">1.5% de todas as transações e 10% das taxas de API de IA são permanentemente removidas de circulação.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center shrink-0">💎</div>
                <div>
                  <h4 className="font-bold">Staking de Utilidade</h4>
                  <p className="text-sm text-gray-400">Holders que fazem stake ganham descontos no marketplace de compute e prioridade em airdrops do ecossistema.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center shrink-0">🛡️</div>
                <div>
                  <h4 className="font-bold">Anti-Whale & Dumping</h4>
                  <p className="text-sm text-gray-400">Limite de 1% do supply por carteira e vesting linear de 48 meses para a equipe fundadora.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsChart;
