export const UserRole = {
    STUDENT: 'ROLE_STUDENT',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface AuthResponse {
    roles: UserRole[];
    fullName: string;
    id: number;
}
