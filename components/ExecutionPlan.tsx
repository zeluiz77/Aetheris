import React, { useState } from 'react';
import DeploymentTerminal from './DeploymentTerminal';

const ExecutionPlan: React.FC = () => {
  const [activeCode, setActiveCode] = useState<'token' | 'staking'>('staking');

  const steps = [
    {
      title: "Fase de Codificação Core",
      desc: "Desenvolvimento dos Smart Contracts em Solidity e Rust. Implementação da ponte (Bridge) AetherNet <> Ethereum.",
      icon: "💻"
    },
    {
      title: "O Motor de Consenso (PoI)",
      desc: "Criação do wrapper de inferência que utiliza bibliotecas como PyTorch/TensorFlow integradas ao protocolo de rede P2P.",
      icon: "⚙️"
    },
    {
      title: "Conformidade e Segurança",
      desc: "Auditorias de código por firmas como OpenZeppelin e estruturação jurídica (VASP) em jurisdições amigáveis a cripto.",
      icon: "🛡️"
    },
    {
      title: "Bootstrapping de Liquidez",
      desc: "Realização de um IDO (Initial DEX Offering) para criar o par de liquidez AETHR/ETH e atrair os primeiros validadores.",
      icon: "🚀"
    }
  ];

  return (
    <div className="py-24 px-4 bg-zinc-900/30" id="execution">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-grotesk font-bold mb-4">Viabilidade & Execução</h2>
          <p className="text-gray-400">Do conceito ao bloco gênese: o caminho técnico para a AetherNet.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="glass p-8 rounded-3xl border-white/5 hover:bg-white/5 transition-all">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-3 font-grotesk">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <DeploymentTerminal />

        <div className="mt-16 glass p-10 rounded-[2.5rem] border-blue-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="text-2xl font-bold font-grotesk flex items-center gap-3">
              <span className="text-blue-500 font-mono">{'//'}</span> Arquitetura de Contratos
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveCode('staking')}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${activeCode === 'staking' ? 'bg-blue-600 text-white' : 'glass text-gray-500'}`}
              >
                AetherNeuralStaking.sol
              </button>
              <button 
                onClick={() => setActiveCode('token')}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${activeCode === 'token' ? 'bg-blue-600 text-white' : 'glass text-gray-500'}`}
              >
                AetherisToken.sol
              </button>
            </div>
          </div>
          
          <div className="bg-black/60 rounded-xl p-6 font-mono text-xs text-blue-300 border border-white/10 overflow-x-auto h-[450px]">
            {activeCode === 'staking' ? (
              <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AetherNeuralStaking
 * @dev Implementação do Vault de Rendimento da Rede Aetheris
 */
contract AetherNeuralStaking is ReentrancyGuard {
    uint256 public constant LOCK_PERIOD = 30 days;
    uint256 public constant BASE_APY = 15;

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 lastClaim;
    }

    mapping(address => Stake) public userStakes;

    function stake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "STAKE_ZERO_AMOUNT");
        _syncRewards(msg.sender);
        
        IERC20(AETHR).transferFrom(msg.sender, address(this), _amount);
        
        userStakes[msg.sender].amount += _amount;
        userStakes[msg.sender].startTime = block.timestamp;
        emit Staked(msg.sender, _amount);
    }

    function calculateYield(address _node) public view returns (uint256) {
        Stake storage s = userStakes[_node];
        uint256 time = block.timestamp - s.lastClaim;
        return (s.amount * BASE_APY * time) / (365 days * 100);
    }
}`}</pre>
            ) : (
              <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AetherisToken is ERC20, ERC20Burnable {
    uint256 public constant INFERENCE_BURN = 150; // 1.5% burn fee

    function executeAITask(bytes32 _task) external {
        uint256 _fee = getTaskFee(_task);
        uint256 _toBurn = (_fee * INFERENCE_BURN) / 10000;
        
        _burn(msg.sender, _toBurn);
        _transfer(msg.sender, validator, _fee - _toBurn);
        
        emit NeuralInferenceSuccess(_task);
    }
}`}</pre>
            )}
          </div>
          <div className="mt-6 flex items-center gap-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-gray-400 text-xs">
              {activeCode === 'staking' 
                ? 'Lógica de incentivo de longo prazo. O tempo de bloqueio é verificado on-chain para prevenir abusos de governança.' 
                : 'Mecanismo deflacionário nativo. O supply reduz proporcionalmente à demanda por inteligência artificial.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionPlan;