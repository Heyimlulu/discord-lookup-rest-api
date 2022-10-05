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

/**
 * Data returned by the Discord API
 */
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

/**
 * Data returned by the API
 */
export interface LookupResponse {
    success: boolean;
    message: string;
    data: DataResponse;
}

/**
 * Error returned by the API
 */
export interface ErrorLookupResponse {
    success: false;
    message: string;
    data: DataResponse;
}

/**
 * Error response
 */
export interface ErrorResponse {
    success: false;
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