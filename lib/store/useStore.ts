import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'super_admin' | 'admin' | 'employee';
export type Theme = 'light' | 'dark';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  department: string;
  position: string;
}

interface AppState {
  user: User | null;
  theme: Theme;
  sidebarCollapsed: boolean;
  setUser: (user: User | null) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: {
        id: '1', name: 'Alex Morrison', email: 'alex@nexushr.com',
        role: 'admin', department: 'Engineering', position: 'HR Manager',
        avatar: '',
      },
      theme: 'light',
      sidebarCollapsed: false,
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
    }),
    { name: 'nexushr-store' }
  )
);
