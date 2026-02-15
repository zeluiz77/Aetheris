
export type Language = 'pt' | 'en' | 'es';

export const translations = {
  pt: {
    heroTitle: "AETHERIS",
    heroSubtitle: "O despertar da Soberania Algorítmica.",
    connectWallet: "Gateway Connect",
    neuralLoad: "Carga Neural",
    networkPulse: "Pulso de Rede",
    syncing: "Sincronizando Módulo Neural...",
    buyAethr: "Adquirir $AETHR",
    exploreProtocol: "Explorar Protocolo",
    oracle: "Oráculo",
    dao: "DAO",
    finance: "Finanças",
    ecosystem: "Ecossistema",
    footerText: "O ponto de singularidade entre finanças e inteligência.",
  },
  en: {
    heroTitle: "AETHERIS",
    heroSubtitle: "The awakening of Algorithmic Sovereignty.",
    connectWallet: "Connect Gateway",
    neuralLoad: "Neural Load",
    networkPulse: "Network Pulse",
    syncing: "Syncing Neural Module...",
    buyAethr: "Acquire $AETHR",
    exploreProtocol: "Explore Protocol",
    oracle: "Oracle",
    dao: "DAO",
    finance: "Finance",
    ecosystem: "Ecosystem",
    footerText: "The singularity point between finance and intelligence.",
  },
  es: {
    heroTitle: "AETHERIS",
    heroSubtitle: "El despertar de la Soberanía Algorítmica.",
    connectWallet: "Conectar Gateway",
    neuralLoad: "Carga Neural",
    networkPulse: "Pulso de Red",
    syncing: "Sincronizando Módulo Neural...",
    buyAethr: "Adquirir $AETHR",
    exploreProtocol: "Explorar Protocolo",
    oracle: "Oráculo",
    dao: "DAO",
    finance: "Finanzas",
    ecosystem: "Ecosistema",
    footerText: "El punto de singularidad entre las finanzas y la inteligencia.",
  }
};

export const detectLanguage = (): Language => {
  const lang = navigator.language.split('-')[0];
  if (['pt', 'en', 'es'].includes(lang)) return lang as Language;
  return 'en';
};
