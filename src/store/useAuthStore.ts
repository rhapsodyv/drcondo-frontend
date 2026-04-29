import { create } from 'zustand';

const SESSION_KEY = 'logado';

interface AuthState {
  isLogado: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(() => ({
  isLogado: sessionStorage.getItem(SESSION_KEY) === 'true',
  login: () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    useAuthStore.setState({ isLogado: true });
  },
  logout: () => {
    sessionStorage.removeItem(SESSION_KEY);
    useAuthStore.setState({ isLogado: false });
  },
}));
