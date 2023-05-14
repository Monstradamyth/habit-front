import * as SecureStore from 'expo-secure-store';

export class TokenStore {
  private KEY = 'TOKEN' as const;
  private value: string | null = null;


  async setToken(value: string | null) {
    this.value = value;
    return SecureStore.setItemAsync(this.KEY, `${value || ''}`);
  }

  async getToken() {
    const token = await SecureStore.getItemAsync(this.KEY);
    await this.setToken(token);

    return this.value;
  }

  async deleteToken() {
    await SecureStore.deleteItemAsync(this.KEY);
    this.value = '';
  }
}

export const clientToken = new TokenStore();
