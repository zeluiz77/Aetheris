
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

export const isCloudEnabled = !!SUPABASE_URL && !!SUPABASE_ANON_KEY;

// Inicializa o cliente apenas se as chaves existirem
export const supabase = isCloudEnabled 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export class CloudStorage {
  static async query(table: string, action: 'select' | 'insert' | 'update', data?: any) {
    if (!supabase) {
      console.warn("Aetheris: Cloud desabilitada. Usando VirtualDB.");
      return null;
    }
    
    // Implementação genérica para facilitar chamadas no backendService
    let queryBuilder = supabase.from(table);
    
    if (action === 'select') return await queryBuilder.select('*');
    if (action === 'insert') return await queryBuilder.insert(data);
    if (action === 'update') return await queryBuilder.update(data).match({ id: data.id });
    
    return null;
  }
}
