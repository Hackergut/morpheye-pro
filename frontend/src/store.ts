import { create } from 'zustand';

interface AppState {
  address: string;
  activeTab: 'scanner' | 'portfolio' | 'history';
  setAddress: (addr: string) => void;
  setActiveTab: (tab: 'scanner' | 'portfolio' | 'history') => void;
}

export const useStore = create<AppState>((set) => ({
  address: 'demo_user_' + Math.random().toString(36).substr(2, 9),
  activeTab: 'scanner',
  setAddress: (address) => set({ address }),
  setActiveTab: (activeTab) => set({ activeTab })
}));
