
/**
 * AETHERIS VIRTUAL DATABASE (VDB)
 * Simula um banco de dados PostgreSQL/Redis para persistência de estado.
 */

export const DB_KEYS = {
  STAKING_BALANCE: 'aetheris_staking_balance',
  DAO_PROPOSALS: 'aetheris_dao_proposals',
  NEURAL_HISTORY: 'aetheris_neural_history',
  USER_ADDRESS: 'aetheris_user_address',
  PURCHASED_APPS: 'aetheris_purchased_apps'
};

export class VirtualDB {
  static save(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static get<T>(key: string, defaultValue: T): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  static clear() {
    localStorage.clear();
  }
}
