import { AuthResponse } from '@/shared';
import { apiService } from '../api';

export const authService = {
    loginRespondent: async (login: string) => {
        const response = await apiService.post<AuthResponse>('/api/v2/auth/login', {
            login: login,
        });
        return response.data;
    },

    loginPsychologist: async (username: string, password: string) => {
        const response = await apiService.post('/api/v2/auth/login', {
            username: username,
            password: password,
        });
        return response.data;
    },
};
