
export const AETHER_TOKEN_ADDRESS = "0xacaa6dd98e12966cbfC64A2a455383a5F32aAB21";
export const STAKING_CONTRACT_ADDRESS = "0x789...D32";

export interface Web3State {
  address: string | null;
  chainId: number | null;
  balance: string;
  isConnecting: boolean;
  error: string | null;
}

export const connectWallet = async (): Promise<string | null> => {
  // Cast window to any to bypass TypeScript property check for ethereum
  if (typeof (window as any).ethereum !== 'undefined') {
    try {
      // Cast window to any to access the ethereum provider injected by extensions like MetaMask
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error("User rejected connection");
      return null;
    }
  } else {
    alert("Por favor, instale a MetaMask para interagir com a Aetheris.");
    return null;
  }
};

export const simulateTransaction = async (type: 'stake' | 'swap', amount: string) => {
  return new Promise((resolve) => {
    console.log(`Iniciando ${type} de ${amount}...`);
    setTimeout(() => {
      resolve(`0x${Math.random().toString(16).slice(2, 64)}`);
    }, 2500);
  });
};

export const getAetherBalance = async (address: string): Promise<string> => {
  // Simulação de chamada de contrato balanceOf
  return (Math.random() * 5000).toFixed(2);
};
