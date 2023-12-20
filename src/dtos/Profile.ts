export interface ProfileData {
    type: string;
    id: string;
    username: string;
    discriminator: string;
    displayName: string | null;
    avatar?: MediaContent;
    isBot?: boolean;
    isSystem?: boolean;
    banner?: MediaContent;
    avatarDecoration?: string | null;
    accentColor?: string | null;
    badges: Array<UserBadges>;
    timestamp: number;
    createdAt: string;
    accountAge: string;
}

export interface MediaContent {
    id?: string | null;
    url?: string | null;
}

export interface UserBadges  {
    name: string;
    image: string;
}