
import { createClient } from '@supabase/supabase-js';

// Limpeza de strings para evitar espaços em branco acidentais
const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_ANON_KEY = (process.env.SUPABASE_ANON_KEY || '').trim();

// Uma chave Supabase válida DEVE começar com 'eyJ'
const isValidKey = SUPABASE_ANON_KEY.startsWith('eyJ');

export const isCloudEnabled = !!SUPABASE_URL && isValidKey;

let supabaseInstance = null;

if (isCloudEnabled) {
  try {
    // Tentativa segura de criar o cliente
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Aetheris: Conexão Cloud estabelecida.");
  } catch (error) {
    console.error("Aetheris: Falha crítica na configuração do Supabase:", error);
    supabaseInstance = null;
  }
} else {
  console.warn("Aetheris: Modo Sandbox (Local). Verifique se SUPABASE_URL e SUPABASE_ANON_KEY (iniciando com eyJ) estão corretos.");
}

export const supabase = supabaseInstance;

export class CloudStorage {
  static async query(table: string, action: 'select' | 'insert' | 'update', data?: any) {
    if (!supabase) return null;
    
    try {
      let queryBuilder = supabase.from(table);
      if (action === 'select') return await queryBuilder.select('*');
      if (action === 'insert') return await queryBuilder.insert(data);
      if (action === 'update') return await queryBuilder.update(data).match({ id: data.id });
    } catch (e) {
      console.error("Cloud Query Error:", e);
    }
    return null;
  }
}
