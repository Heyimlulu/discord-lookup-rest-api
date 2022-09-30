export interface User {
    id: Number;
    username: string;
    avatar: string;
    discriminator: Number,
    email?: string;
    verified?: boolean;
    public_flags: Number,
    flags: number;
    banner: string | null;
    banner_color: string | null;
    accent_color: string | null;
    locale: string;
    mfa_enabled: boolean;
}

export interface DataResponse {
    id: number;
    username: string;
    avatar: string | null;
    isBot?: boolean;
    banner: string | null;
    bannerColor: string | null;
    badges: string[];
    timestamp: number | null;
    created: string;
}

export interface LookupResponse {
    success: boolean;
    message: string;
    data: DataResponse;
}

export interface ErrorResponse {
    success: boolean;
    message: string;
}

export interface Logs {
    id: number;
    date: string;
    count: number;
    createdAt: string;
    updatedAt: string;
}

export interface LogsResponse {
    success: boolean;
    message: string;
    data: Logs;
}