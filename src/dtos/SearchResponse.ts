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
    displayName?: string;
    avatar?: AvatarAndBanner;
    isBot?: boolean;
    isSystem?: boolean;
    banner?: AvatarAndBanner;
    avatarDecoration?: string;
    accentColor?: string;
    flags?: Array<Flags>;
    timestamp: number;
    createdAt: string;
    accountAge: string;
}

interface AvatarAndBanner {
    id?: string;
    url?: string;
}

interface Flags {
    name: string;
    image: string;
}