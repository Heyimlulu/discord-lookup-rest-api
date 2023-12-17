export interface UserResponse {
    status: number;
    success: boolean;
    message?: string;
    data?: LookupResponse;
}

export interface LookupResponse {
    type: string;
    id: string;
    username: string;
    discriminator: string;
    globalName: string | null;
    avatar: AvatarAndBanner;
    isBot: boolean;
    isSystem: boolean;
    banner: AvatarAndBanner;
    bannerColor: string | null;
    flags: Array<Flags>;
    timestamp: number;
    createdAt: string;
    accountAge: string;
}

interface AvatarAndBanner {
    id: string | null;
    url: string | null;
}

interface Flags {
    name: string;
    value: string;
}