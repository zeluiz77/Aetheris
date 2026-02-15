
import React from 'react';
import { ROADMAP_DATA } from '../constants';

const Roadmap: React.FC = () => {
  return (
    <div className="py-24 px-4" id="roadmap">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-grotesk font-bold mb-16 text-center">Nossa Jornada</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {ROADMAP_DATA.map((step) => (
            <div key={step.year} className="relative glass p-8 rounded-3xl group hover:border-blue-500/50 transition-all duration-500">
              <div className="absolute -top-6 -left-4 w-16 h-16 bg-blue-600/20 rounded-full blur-xl group-hover:bg-blue-600/40 transition-all"></div>
              <div className="text-blue-500 font-grotesk text-6xl font-bold opacity-20 mb-4">0{step.year}</div>
              <h3 className="text-2xl font-bold mb-6">{step.title}</h3>
              <ul className="space-y-4">
                {step.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                    <span className="text-blue-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
