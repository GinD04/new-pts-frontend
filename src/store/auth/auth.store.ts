import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from './auth-store.types';

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            user: null,
            setUser: user => set({ user }),
            clear: () => set({ user: null }),
        }),
        {
            name: 'auth-storage',
        },
    ),
);
