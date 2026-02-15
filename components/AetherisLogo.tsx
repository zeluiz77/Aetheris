
import React from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glow?: boolean;
}

const AetherisLogo: React.FC<LogoProps> = ({ size = 'md', className = '', glow = true }) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-32 h-32',
    xl: 'w-64 h-64 md:w-80 md:h-80'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizes[size]} ${className} group`}>
      {/* Camadas de Brilho */}
      {glow && (
        <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-150 animate-pulse group-hover:bg-cyan-400/30 transition-all duration-700"></div>
      )}
      
      {/* SVG Principal */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full filter drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
      >
        {/* Hexágono de Fundo */}
        <path 
          d="M50 5L89 27.5V72.5L50 95L11 72.5V27.5L50 5Z" 
          className="stroke-cyan-500/30" 
          strokeWidth="1" 
          fill="rgba(0,0,0,0.4)"
        />
        
        {/* Anel de Rotação */}
        <circle 
          cx="50" cy="50" r="45" 
          className="stroke-cyan-500/10" 
          strokeWidth="0.5" 
          strokeDasharray="10 5"
        />
        
        {/* O 'A' Estilizado */}
        <path 
          d="M50 20L75 75H65L50 40L35 75H25L50 20Z" 
          fill="url(#logo-grad)" 
          className="transition-all duration-500 group-hover:scale-105 origin-center"
        />
        
        {/* Barra Central do A (Neural Link) */}
        <path 
          d="M40 55H60" 
          className="stroke-cyan-300 animate-[pulse_2s_infinite]" 
          strokeWidth="2" 
          strokeLinecap="round"
        />

        {/* Detalhes de Conexão */}
        <circle cx="50" cy="20" r="1.5" fill="#22d3ee" className="animate-pulse" />
        <circle cx="25" cy="75" r="1.5" fill="#22d3ee" className="animate-pulse [animation-delay:0.5s]" />
        <circle cx="75" cy="75" r="1.5" fill="#22d3ee" className="animate-pulse [animation-delay:1s]" />

        <defs>
          <linearGradient id="logo-grad" x1="50" y1="20" x2="50" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Ornamentos Externos de Vidro */}
      <div className="absolute inset-0 border border-white/5 rounded-full rotate-45 scale-110 group-hover:rotate-90 transition-transform duration-1000"></div>
    </div>
  );
};

export default AetherisLogo;
