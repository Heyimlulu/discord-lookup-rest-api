export interface ProfileData {
    type: string;
    id: string;
    username: string;
    discriminator: string;
    displayName?: string;
    avatar?: MediaContent;
    isBot?: boolean;
    isSystem?: boolean;
    banner?: MediaContent;
    avatarDecoration?: string;
    accentColor?: string;
    flags?: Array<UserFlags>;
    timestamp: number;
    createdAt: string;
    accountAge: string;
}

export interface MediaContent  {
    id?: string;
    url?: string;
}

export interface UserFlags  {
    name: string;
    image: string;
}