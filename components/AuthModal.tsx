
import React, { useState } from 'react';
import { supabase, isCloudEnabled } from '../services/supabaseClient.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCloudEnabled) {
      setError("Sistema Cloud (Supabase) não configurado no .env");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: authError } = isSignUp 
        ? await supabase!.auth.signUp({ email, password })
        : await supabase!.auth.signInWithPassword({ email, password });

      if (authError) throw authError;
      onClose();
    } catch (err: any) {
      setError(err.message || "Erro na autenticação neural.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
      <div className="glass w-full max-w-md rounded-[3.5rem] border-white/10 p-12 relative overflow-hidden animate-in zoom-in-95 duration-500 bg-zinc-950/50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        
        <div className="text-center mb-10">
          <div className="text-4xl mb-4">🔮</div>
          <h3 className="text-2xl font-grotesk font-black text-white uppercase tracking-tighter">Identidade Neural</h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Acesso ao Núcleo de Consciência</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[9px] text-gray-500 uppercase font-black ml-4">Email de Registro</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all"
              placeholder="nexo@aetheris.io"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-gray-500 uppercase font-black ml-4">Chave de Acesso</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] text-red-400 font-mono">
              [AUTH_ERROR]: {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-white text-black font-black rounded-2xl uppercase tracking-widest text-[11px] shadow-2xl hover:bg-cyan-400 transition-all disabled:opacity-30"
          >
            {loading ? 'SINCRONIZANDO...' : isSignUp ? 'CRIAR NEXO' : 'EFETUAR LOGIN'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest font-bold"
          >
            {isSignUp ? 'Já possui identidade? Login' : 'Novo na rede? Criar Identidade'}
          </button>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-6 text-[9px] font-mono text-gray-700 hover:text-gray-500 uppercase"
        >
          Abortar Processo
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
