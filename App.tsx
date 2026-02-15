
import React, { useState, useEffect, lazy, Suspense } from 'react';
import SecuritySection from './components/SecuritySection.tsx';
import ExecutionPlan from './components/ExecutionPlan.tsx';
import WealthMechanics from './components/WealthMechanics.tsx';
import DevWorkspace from './components/DevWorkspace.tsx';
import NeuralHub from './components/NeuralHub.tsx';
import AetherisFinance from './components/AetherisFinance.tsx';
import DAOGovernance from './components/DAOGovernance.tsx';
import NetworkPulse from './components/NetworkPulse.tsx';
import WhitepaperTerminal from './components/WhitepaperTerminal.tsx';
import NeuralBackground from './components/NeuralBackground.tsx';
import AetherOracle from './components/AetherOracle.tsx';
import ArtifactFactory from './components/ArtifactFactory.tsx';
import LiveResonance from './components/LiveResonance.tsx';
import CinematicVisions from './components/CinematicVisions.tsx';
import CrossBridge from './components/CrossBridge.tsx';
import AetherCommerce from './components/AetherCommerce.tsx';
import InitiationRitual from './components/InitiationRitual.tsx';
import WorldPulse from './components/WorldPulse.tsx';
import SocialExpander from './components/SocialExpander.tsx';
import EcosystemShowcase from './components/EcosystemShowcase.tsx';
import StatusBar from './components/StatusBar.tsx';
import WalletModal from './components/WalletModal.tsx';
import AuthModal from './components/AuthModal.tsx';
import AetherStore from './components/AetherStore.tsx';
import NodePerformanceDashboard from './components/NodePerformanceDashboard.tsx';
import NotificationSystem from './components/NotificationSystem.tsx';
import AetherisLogo from './components/AetherisLogo.tsx';
import { FEATURES_DATA } from './constants.tsx';
import { translations, detectLanguage, Language } from './services/i18n.ts';
import { backend } from './services/backendService.ts';
import { supabase } from './services/supabaseClient.ts';

const Hero = lazy(() => import('./components/Hero.tsx'));
const TokenomicsChart = lazy(() => import('./components/TokenomicsChart.tsx'));
const Roadmap = lazy(() => import('./components/Roadmap.tsx'));
const ArchitectChat = lazy(() => import('./components/ArchitectChat.tsx'));

const LoadingFallback = ({ lang }: { lang: Language }) => (
  <div className="w-full py-24 flex flex-col items-center justify-center space-y-4 opacity-50">
    <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
    <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em]">{translations[lang].syncing}</span>
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isInitialSync, setIsInitialSync] = useState(true);
  const [lang, setLang] = useState<Language>(detectLanguage());

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    }

    const timer = setTimeout(() => setIsInitialSync(false), 2000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleConnectWallet = (address: string) => {
    setIsWalletModalOpen(false);
    setIsSyncing(true);
    setTimeout(() => {
      setWalletAddress(address);
      setIsSyncing(false);
    }, 1000);
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setWalletAddress(null);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Espaço para compensar o navbar fixo
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (isInitialSync) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[1000]">
        <div className="relative w-64 h-1 bg-white/5 rounded-full overflow-hidden mb-4">
          <div className="absolute inset-y-0 left-0 bg-cyan-500 animate-[sync-progress_2s_ease-in-out_infinite]"></div>
        </div>
        <div className="flex flex-col items-center text-center px-6">
           <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.5em] animate-pulse">Establishing Neural Link</span>
           <span className="text-[8px] font-mono text-gray-600 mt-2 uppercase">Aetheris-Mainnet-Node-01: Synchronizing...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-cyan-500/30 overflow-x-hidden bg-black text-white pb-12">
      <NeuralBackground />
      <StatusBar />
      <NotificationSystem />
      
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
        onConnect={handleConnectWallet} 
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'bg-black/95 backdrop-blur-3xl py-3 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-4 group cursor-pointer" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <AetherisLogo size="sm" glow={false} />
            <div className="hidden sm:flex flex-col">
              <span className="font-grotesk font-black text-xl md:text-2xl tracking-tighter text-white leading-none uppercase italic group-hover:text-cyan-400 transition-colors">AETHERIS</span>
              <span className="text-[7px] font-mono text-cyan-500/60 font-bold tracking-[0.4em] uppercase">Neural Protocol</span>
            </div>
          </div>
          
          <div className="hidden lg:flex gap-10 text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em] items-center">
            {['Store', 'Oracle', 'DAO', 'Finance'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => handleScrollTo(e, item.toLowerCase())}
                className="hover:text-white transition-all group relative"
              >
                {t[item.toLowerCase() as keyof typeof t] || item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {user ? (
              <div className="flex items-center gap-3">
                 <div className="hidden md:block text-right">
                   <div className="text-[8px] text-gray-500 uppercase font-black">Identidade Ativa</div>
                   <div className="text-[10px] text-white font-mono truncate max-w-[100px]">{user.email}</div>
                 </div>
                 <button onClick={handleLogout} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 transition-all text-sm shadow-inner">🚪</button>
              </div>
            ) : (
              <button onClick={() => setIsAuthModalOpen(true)} className="px-5 py-2.5 md:px-6 md:py-3 glass border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Login</button>
            )}

            <button 
              onClick={() => walletAddress ? setWalletAddress(null) : setIsWalletModalOpen(true)}
              className={`px-6 py-2.5 md:px-8 md:py-3 rounded-xl text-[9px] md:text-[10px] font-black transition-all uppercase tracking-widest border flex items-center gap-3 ${
                walletAddress ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-white text-black border-transparent hover:bg-cyan-50'
              }`}
            >
              {walletAddress ? walletAddress : t.connectWallet}
            </button>
          </div>
        </div>
      </nav>

      <Suspense fallback={<LoadingFallback lang={lang} />}>
        <Hero />
      </Suspense>

      <WorldPulse />
      <SocialExpander />
      <EcosystemShowcase />
      <InitiationRitual />
      <CrossBridge />
      <AetherCommerce />
      <LiveResonance />
      <CinematicVisions />

      <AetherStore walletConnected={!!walletAddress || !!user} />
      
      {(user || walletAddress) && <NodePerformanceDashboard />}

      <div className="py-24 px-4 bg-transparent" id="features">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {FEATURES_DATA.map((f, i) => (
            <div key={i} className="glass p-12 rounded-[3.5rem] border-white/5 hover:border-cyan-500/20 transition-all group hover:-translate-y-3 duration-500 bg-black/40 backdrop-blur-xl">
              <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500 inline-block">{f.icon}</div>
              <h3 className="text-2xl font-bold font-grotesk mb-4 text-white uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm font-medium">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      <AetherOracle />
      <ArtifactFactory />
      <NeuralHub walletConnected={!!walletAddress || !!user} onConnect={() => setIsAuthModalOpen(true)} lang={lang} />
      <AetherisFinance walletConnected={!!walletAddress || !!user} />
      <WhitepaperTerminal />
      <NetworkPulse />
      <DAOGovernance />
      <DevWorkspace />
      <WealthMechanics />
      <SecuritySection />
      <ExecutionPlan />

      <Suspense fallback={<LoadingFallback lang={lang} />}>
        <TokenomicsChart />
        <Roadmap />
        <ArchitectChat lang={lang} />
      </Suspense>

      <footer className="py-32 px-4 border-t border-white/5 text-center bg-black relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-cyan-500/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <AetherisLogo size="md" className="mb-10 opacity-30 grayscale hover:grayscale-0 transition-all" />
          <div className="font-grotesk font-black text-5xl mb-6 tracking-tighter text-white uppercase italic">AETHERIS <span className="text-cyan-500">$AETHR</span></div>
          <p className="text-gray-500 text-base mb-16 max-w-xl mx-auto leading-relaxed font-medium">{t.footerText}</p>
          <div className="mt-20 text-[9px] font-mono text-gray-800 tracking-[0.5em] uppercase">© 2025 AETHERIS • INFRASTRUCTURE VERIFIED</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
