export type Login = {
    username: string;
    password: string;
}

export type User = {
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

export type DataResponse = {
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

export type LookupResponse = {
    success: boolean;
    message: string;
    data: DataResponse;
}

export type ErrorResponse = {
    success: boolean;
    message: string;
}

export type Logs = {
    id: number;
    date: string;
    count: number;
    createdAt: string;
    updatedAt: string;
}

export type LogsResponse = {
    success: boolean;
    message: string;
    data: Logs;
}