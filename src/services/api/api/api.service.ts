import { useAuthStore } from '@/store';
import axios from 'axios';
import type { AxiosResponse, AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? '';

export interface ApiServiceOptions {
    baseURL?: string;
    defaultHeaders?: Record<string, string>;
    onUnauthorized?: () => void;
}

const clearAuthData = () => {
    useAuthStore.getState().clear();
    window.location.href = '/login';
};

export class ApiServiceController {
    private readonly instance: AxiosInstance;

    constructor(options?: ApiServiceOptions) {
        this.instance = axios.create({
            baseURL: options?.baseURL ?? '/api',
            headers: {
                'Content-Type': 'application/json',
                ...options?.defaultHeaders,
            },
        });

        this.instance.interceptors.response.use(
            response => response,
            error => this.handleResponseError(error, options?.onUnauthorized),
        );
    }

    private readonly handleResponseError = (error: AxiosError, onUnauthorized?: () => void) => {
        if (error.response?.status === 401) {
            if (onUnauthorized) {
                onUnauthorized();
            } else {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    };

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.get<T>(url, config);
    }

    public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.post<T>(url, data, config);
    }

    public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.put<T>(url, data, config);
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.delete<T>(url, config);
    }
}

export const apiService = new ApiServiceController({
    baseURL: BASE_URL,
    onUnauthorized: clearAuthData,
});
