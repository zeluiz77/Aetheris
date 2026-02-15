
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { askArchitect } from '../services/geminiService.ts';
import { Language } from '../services/i18n.ts';

interface ArchitectChatProps {
  lang: Language;
}

const ArchitectChat: React.FC<ArchitectChatProps> = ({ lang }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const greetings = {
      pt: 'Saudações. Eu sou o Arquiteto Sênior da **Aetheris**. Como posso auxiliar na sua compreensão da nossa infraestrutura de IA descentralizada hoje?',
      en: 'Greetings. I am the Senior Architect of **Aetheris**. How can I assist in your understanding of our decentralized AI infrastructure today?',
      es: 'Saludos. Soy el Arquitecto Senior de **Aetheris**. ¿Cómo posso auxiliar en su comprensión de nuestra infraestructura de IA descentralizada hoy?'
    };
    setMessages([{ role: 'ai', text: greetings[lang] }]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await askArchitect(userMsg, lang);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  const markdownComponents = {
    a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline" />,
    h1: ({ ...props }) => <h1 {...props} className="text-2xl font-bold mt-8 mb-4 font-grotesk text-white border-b border-white/10 pb-2" />,
    h2: ({ ...props }) => <h2 {...props} className="text-xl font-bold mt-6 mb-3 font-grotesk text-white" />,
    p: ({ ...props }) => <p {...props} className="mb-4 last:mb-0 leading-relaxed text-gray-300" />,
    ul: ({ ...props }) => <ul {...props} className="list-disc ml-6 mb-4 space-y-2 marker:text-cyan-500" />,
    li: ({ ...props }) => <li {...props} className="text-gray-300 pl-1">{props.children}</li>,
    pre: ({ ...props }) => <pre {...props} className="bg-black/60 p-5 rounded-2xl border border-white/10 overflow-x-auto my-6 font-mono text-xs" />,
    code: ({ ...props }) => <code {...props} className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-sm text-cyan-300" />,
  };

  return (
    <div className="py-24 px-4 bg-zinc-950" id="chat">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-grotesk font-bold mb-4">{lang === 'pt' ? 'Núcleo de Inteligência' : lang === 'es' ? 'Núcleo de Inteligencia' : 'Intelligence Core'}</h2>
          <p className="text-gray-400">{lang === 'pt' ? 'Interaja com a consciência do protocolo.' : lang === 'es' ? 'Interactúa con la conciencia del protocolo.' : 'Interact with the protocol consciousness.'}</p>
        </div>

        <div className="glass rounded-3xl overflow-hidden flex flex-col h-[700px] border-white/5 shadow-2xl relative">
          <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-xs uppercase tracking-[0.2em] text-cyan-500/80">Architect v4.2.1 [{lang.toUpperCase()}]</span>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-black/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-2xl ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'glass rounded-tl-none border-blue-500/10 shadow-lg'}`}>
                  <div className="text-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{m.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass p-5 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white/5 border-t border-white/10">
            <div className="flex gap-3 items-center bg-black/40 rounded-2xl p-2 border border-white/10">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'pt' ? "Pergunte algo..." : lang === 'es' ? "Pregunta algo..." : "Ask anything..."}
                className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-white text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl transition-all disabled:opacity-20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectChat;
