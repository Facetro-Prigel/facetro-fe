import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    errorMessage: null,
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken;
    },
    clearToken() {
      this.token = null;
    },
    setError(message) {
      this.errorMessage = message;
    },
    clearError() {
      this.errorMessage = null;
    },
  },
});