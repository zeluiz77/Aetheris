
import { VirtualDB, DB_KEYS } from './database.ts';
import { supabase, isCloudEnabled } from './supabaseClient.ts';

const API_BASE_URL = 'http://localhost:3001/api';

export interface ProtocolStats {
  price: number;
  tvl: string;
  tps: number;
  height: number;
  burned: number;
  neuralLoad: number;
}

export interface NeuralModule {
  id: string;
  name: string;
  category: string;
  price: number;
  desc: string;
}

export interface UserProgress {
  level: number;
  xp: number;
  nextLevelXp: number;
  unlockedArts: string[];
}

export interface Proposal {
  id: string;
  title: string;
  desc: string;
  votesFor: number;
  votesAgainst: number;
  status: 'Active' | 'Closed';
}

export type NotificationType = 'yield_milestone' | 'level_up' | 'purchase_success' | 'network_alert' | 'sync_complete';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
}

export class BackendService {
  private static instance: BackendService;
  private stats: ProtocolStats = VirtualDB.get('cached_stats', {
    price: 0.1245, tvl: "4.2B", tps: 42105, height: 1420582, burned: 15420.5, neuralLoad: 42
  });
  private listeners: ((stats: ProtocolStats) => void)[] = [];
  private notificationListeners: ((notif: AppNotification) => void)[] = [];
  public isCloudActive: boolean = isCloudEnabled;

  private constructor() { this.init(); }

  public static getInstance(): BackendService {
    if (!BackendService.instance) BackendService.instance = new BackendService();
    return BackendService.instance;
  }

  private async init() {
    this.startLiveUpdates();
    this.monitorYieldMilestones();
    
    // Cloud Synchronization on Startup
    if (this.isCloudActive) {
      await this.syncWithCloud();
    }
    
    const currentProposals = VirtualDB.get<Proposal[]>('dao_proposals', []);
    if (currentProposals.length === 0) {
      VirtualDB.save('dao_proposals', [
        { id: 'DAO-001', title: 'Ativar Protocolo de Queima v2', desc: 'Aumentar taxa de queima de 1.5% para 2.0% para combater inflação.', votesFor: 1250, votesAgainst: 450, status: 'Active' },
        { id: 'DAO-002', title: 'Expansão de Sharding #05', desc: 'Alocar 500k $AETHR para infraestrutura de novos nós validadores.', votesFor: 890, votesAgainst: 120, status: 'Active' },
        { id: 'DAO-003', title: 'Integração Veo Engine', desc: 'Permitir que a rede processe tarefas de vídeo cinemático via VEO.', votesFor: 2100, votesAgainst: 50, status: 'Active' }
      ]);
    }
  }

  private async syncWithCloud() {
    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (user) {
        // Sync progress from Supabase to Local
        const { data: cloudProgress } = await supabase!
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (cloudProgress) {
          VirtualDB.save(`aetheris_xp_${user.id}`, cloudProgress.xp);
          this.emitNotification({
            id: 'sync-' + Date.now(),
            type: 'sync_complete',
            title: 'Sincronização Cloud',
            message: 'Dados recuperados do Supabase com sucesso.',
            timestamp: Date.now()
          });
        }
      }
    } catch (e) {
      console.warn("Cloud Sync Failed:", e);
    }
  }

  private async fetchStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      if (response.ok) {
        const data = await response.json();
        this.stats = data;
        VirtualDB.save('cached_stats', this.stats);
        this.notify();
      }
    } catch (error) {
      this.stats = { 
        ...this.stats, 
        price: this.stats.price * (1 + (Math.random() - 0.5) * 0.002), 
        height: this.stats.height + 1,
        neuralLoad: Math.max(10, Math.min(95, this.stats.neuralLoad + (Math.random() - 0.5) * 5))
      };
      this.notify();
    }
  }

  private startLiveUpdates() {
    this.fetchStats();
    setInterval(() => this.fetchStats(), 4000);
  }

  private monitorYieldMilestones() {
    let lastYieldChecked = 0;
    setInterval(async () => {
      const history = await this.getYieldHistory();
      const currentYield = history.reduce((a, b) => a + b.yield, 0);
      
      if (Math.floor(currentYield / 10) > Math.floor(lastYieldChecked / 10)) {
        this.emitNotification({
          id: Math.random().toString(),
          type: 'yield_milestone',
          title: 'Meta de Rendimento',
          message: `Seu nó acaba de cruzar a marca de ${Math.floor(currentYield)} $AETHR gerados!`,
          timestamp: Date.now()
        });
        lastYieldChecked = currentYield;
      }
    }, 10000);
  }

  private notify() { this.listeners.forEach(l => l(this.stats)); }
  public subscribe(callback: (stats: ProtocolStats) => void) {
    this.listeners.push(callback);
    callback(this.stats);
    return () => { this.listeners = this.listeners.filter(l => l !== callback); };
  }

  public onNotification(callback: (notif: AppNotification) => void) {
    this.notificationListeners.push(callback);
    return () => { this.notificationListeners = this.notificationListeners.filter(l => l !== callback); };
  }

  private emitNotification(notif: AppNotification) {
    this.notificationListeners.forEach(l => l(notif));
  }

  private async getUserId(): Promise<string | null> {
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  }

  public async getUserProgress(): Promise<UserProgress> {
    const uid = await this.getUserId();
    const staking = await this.getStakingBalance();
    const modules = await this.getPurchasedIds();
    
    // XP calculation: staking + modules + level multiplier
    const xp = (staking * 0.1) + (modules.length * 500);
    const level = Math.floor(Math.sqrt(xp / 100)) + 1;
    const nextLevelXp = Math.pow(level, 2) * 100;

    return { level, xp, nextLevelXp, unlockedArts: level >= 3 ? ['Prestige-01'] : [] };
  }

  public async getMarketplaceModules(): Promise<NeuralModule[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/marketplace/modules`);
      if (response.ok) return await response.json();
    } catch (error) {}
    
    return [
      { id: 'mod-01', name: 'Sentinel Zero', category: 'Security', price: 150, desc: 'Proteção contra ataques de reentrada via IA.' },
      { id: 'mod-02', name: 'Oracle DeepScan', category: 'Analytics', price: 300, desc: 'Análise preditiva de liquidez em tempo real.' },
      { id: 'mod-03', name: 'Vision Forge Pro', category: 'Creative', price: 500, desc: 'Geração de vídeo 4K sem limites de quota.' },
      { id: 'mod-04', name: 'Code Alchemist', category: 'Dev', price: 200, desc: 'Otimizador de Smart Contracts nativo.' }
    ];
  }

  public async purchaseModule(moduleId: string): Promise<boolean> {
    const uid = await this.getUserId();
    const address = uid || 'anonymous_node';
    
    try {
      const response = await fetch(`${API_BASE_URL}/marketplace/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, address })
      });
      
      if (response.ok) {
        const data = await response.json();
        const key = `aetheris_purchased_apps_${uid || 'anon'}`;
        const purchased = VirtualDB.get<string[]>(key, []);
        
        if (!purchased.includes(moduleId)) {
          const newList = [...purchased, moduleId];
          VirtualDB.save(key, newList);
          
          this.emitNotification({
            id: Math.random().toString(),
            type: 'purchase_success',
            title: 'Módulo Integrado',
            message: `A rede expandiu sua consciência. TX: ${data.txHash.substring(0, 10)}...`,
            timestamp: Date.now()
          });

          if (uid && isCloudEnabled) {
            await supabase!.from('user_inventory').upsert({ user_id: uid, module_id: moduleId });
          }
        }
        return true;
      }
    } catch (error) {}
    return false;
  }

  public async getPurchasedIds(): Promise<string[]> {
    const uid = await this.getUserId();
    const key = `aetheris_purchased_apps_${uid || 'anon'}`;
    return VirtualDB.get<string[]>(key, []);
  }

  public async getYieldHistory(): Promise<{time: string, yield: number}[]> {
    return Array.from({length: 12}).map((_, i) => ({
      time: `${i+1}h`,
      yield: Math.random() * 2 + (i * 0.5)
    }));
  }

  public async getStakingBalance(): Promise<number> { 
    const uid = await this.getUserId();
    return VirtualDB.get<number>(`aetheris_staking_balance_${uid || 'anon'}`, 0); 
  }

  public async saveStakingBalance(amount: number): Promise<void> {
    const uid = await this.getUserId();
    const key = `aetheris_staking_balance_${uid || 'anon'}`;
    const current = VirtualDB.get<number>(key, 0);
    const newVal = current + amount;
    VirtualDB.save(key, newVal);

    if (uid && isCloudEnabled) {
      await supabase!.from('user_progress').upsert({ user_id: uid, xp: newVal * 0.1 });
    }
  }

  public getStats() { return this.stats; }
  
  public async getNeuralHistory(): Promise<any[]> { 
    return VirtualDB.get<any[]>('neural_history', []); 
  }

  public async saveInference(task: string, result: string): Promise<void> {
    const history = await this.getNeuralHistory();
    VirtualDB.save('neural_history', [{ task, result, timestamp: Date.now() }, ...history].slice(0, 10));
  }
  
  public async getProposals(): Promise<Proposal[]> { 
    return VirtualDB.get<Proposal[]>('dao_proposals', []); 
  }
  
  public async castVote(id: string, vote: 'yes' | 'no'): Promise<void> {
    const proposals = await this.getProposals();
    const index = proposals.findIndex(p => p.id === id);
    if (index !== -1) {
      if (vote === 'yes') proposals[index].votesFor += 1;
      else proposals[index].votesAgainst += 1;
      VirtualDB.save('dao_proposals', proposals);
      
      if (isCloudEnabled) {
        await supabase!.from('dao_votes').insert({ proposal_id: id, vote_type: vote });
      }
    }
    await new Promise(resolve => setTimeout(resolve, 800));
  }
}

export const backend = BackendService.getInstance();
