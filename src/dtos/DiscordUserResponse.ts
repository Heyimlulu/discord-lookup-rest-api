export interface User {
    id: string;
    username: string;
    discriminator: string;
    global_name?: string;
    avatar?: string;
    bot: boolean;
    system: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale: string;
    verified: boolean;
    email?: string;
    flags: number;
    premium_type: number;
    public_flags: number;
    avatar_decoration_data: AvatarDecorationData;
}

interface AvatarDecorationData {
    asset: string;
    skuId: number
}