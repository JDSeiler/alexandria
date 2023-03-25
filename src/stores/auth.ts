import { defineStore } from 'pinia'

interface User {
  username: string;
}

interface AuthState {
  activeUser: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      activeUser: null,
    } as AuthState
  },
  getters: {
    isSignedIn: (state) => state.activeUser !== null 
  },
  actions: {
    setActiveUser(user: User) {
      this.$patch({ activeUser: user });
    }
  },
})
