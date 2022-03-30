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
