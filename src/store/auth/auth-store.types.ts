import type { AuthResponse } from '@/shared';

export interface AuthState {
    user: AuthResponse | null;
    setUser: (user: AuthResponse | null) => void;
    clear: () => void;
}
