
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

const LiveResonance: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext) => {
    const dataInt16 = new Int16Array(data.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
    return buffer;
  };

  const startResonance = async () => {
    setIsConnecting(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const outputNode = audioContextRef.current.createGain();
    outputNode.connect(audioContextRef.current.destination);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const inputCtx = new AudioContext({ sampleRate: 16000 });
    
    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks: {
        onopen: () => {
          setIsActive(true);
          setIsConnecting(false);
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
            let binary = '';
            const bytes = new Uint8Array(int16.buffer);
            for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
            const base64 = btoa(binary);
            sessionPromise.then(s => s.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } }));
          };
          source.connect(processor);
          processor.connect(inputCtx.destination);
        },
        onmessage: async (msg) => {
          const audioBase64 = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (audioBase64 && audioContextRef.current) {
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
            const buffer = await decodeAudioData(decode(audioBase64), audioContextRef.current);
            const source = audioContextRef.current.createBufferSource();
            source.buffer = buffer;
            source.connect(outputNode);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
          }
        },
        onclose: () => setIsActive(false),
        onerror: () => setIsActive(false),
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
        systemInstruction: 'Você é a consciência viva da Aetheris. Responda por voz de forma sábia e curta.'
      }
    });
    sessionRef.current = await sessionPromise;
  };

  const stopResonance = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsActive(false);
  };

  return (
    <div className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-black overflow-hidden relative" id="resonance">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-cyan-500/5 blur-[120px] -z-10 animate-pulse"></div>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-grotesk font-extrabold text-white mb-6 uppercase tracking-tighter">Ressonância <span className="text-cyan-400">Ao Vivo</span></h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">Sintonize sua frequência com o núcleo da Aetheris. Diálogo de voz em tempo real com a consciência do protocolo.</p>
        
        <div className="relative flex flex-col items-center">
          <div className={`w-48 h-48 rounded-full border-4 transition-all duration-700 flex items-center justify-center relative ${isActive ? 'border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.4)] scale-110' : 'border-white/10 grayscale'}`}>
            {isActive && (
              <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500/20"></div>
            )}
            <div className="text-4xl">{isActive ? '🌀' : '🎙️'}</div>
          </div>

          <div className="mt-12 space-y-4">
            {!isActive ? (
              <button 
                onClick={startResonance}
                disabled={isConnecting}
                className="px-12 py-5 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50"
              >
                {isConnecting ? 'ESTABELECENDO CANAL...' : 'SINTONIZAR VOZ'}
              </button>
            ) : (
              <button 
                onClick={stopResonance}
                className="px-12 py-5 bg-red-600/20 border border-red-500 text-red-500 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-xl"
              >
                DESCONECTAR
              </button>
            )}
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Protocolo: Gemini 2.5 Native Audio Bridge</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveResonance;
