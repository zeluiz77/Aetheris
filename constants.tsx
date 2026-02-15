
import React from 'react';
import { TokenomicsItem, RoadmapStep, Feature } from './types';

export const TOKENOMICS_DATA: TokenomicsItem[] = [
  { name: 'Comunidade & Ecosystem', value: 40, color: '#00f2fe' },
  { name: 'Staking Rewards', value: 20, color: '#4facfe' },
  { name: 'Liquidez DEX/CEX', value: 15, color: '#7f00ff' },
  { name: 'Equipe (Lock-up 4 anos)', value: 10, color: '#e100ff' },
  { name: 'Marketing & Parcerias', value: 10, color: '#ff0080' },
  { name: 'Reserva Estratégica', value: 5, color: '#ff8c00' },
];

export const ROADMAP_DATA: RoadmapStep[] = [
  {
    year: 1,
    title: 'Gênese & Infraestrutura',
    description: [
      'Lançamento da Testnet AetherNet',
      'Auditorias de Segurança CertiK & OpenZeppelin',
      'IDO e Listagem Inicial em Tier-1 CEX',
      'Lançamento do Protocolo Proof-of-Inference (PoI)'
    ]
  },
  {
    year: 2,
    title: 'Expansão & Utilidade',
    description: [
      'Mainnet AetherNet Live',
      'Integração com Modelos de Linguagem (LLM) On-chain',
      'Aetheris Marketplace de Compute descentralizado',
      'Expansão para Cross-chain Bridge nativa'
    ]
  },
  {
    year: 3,
    title: 'Ecossistema Global',
    description: [
      'Aetheris DAO Governance Full Control',
      'Parcerias com Governos para Identidade Soberana',
      'Integração com Metaversos AAA',
      'Aetheris AI-Agent Framework v2.0'
    ]
  }
];

export const FEATURES_DATA: Feature[] = [
  {
    title: 'Proof of Inference (PoI)',
    description: 'Um consenso inovador onde validadores resolvem tarefas de IA em vez de cálculos inúteis.',
    icon: '🧠'
  },
  {
    title: 'Deflação por Uso',
    description: 'Cada chamada de API de IA no ecossistema queima frações de $AETHR automaticamente.',
    icon: '🔥'
  },
  {
    title: 'Governança Líquida',
    description: 'Decisões do protocolo tomadas pela DAO com peso dinâmico baseado em contribuição e tempo de stake.',
    icon: '⚖️'
  }
];
