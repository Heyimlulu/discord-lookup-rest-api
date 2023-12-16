export interface SearchResponse {
    status: number;
    message: string;
    data?: DataResponse;
}

interface DataResponse {
    id: string;
    username: string;
    discriminator: string;
    globalName: string | null;
    avatar: string | null;
    bot: boolean;
    system: boolean;
    banner: string | null;
    accentColor: string | null;
    premiumType: string;
    badges: Array<string>;
    timestamp: number;
    created: string;
}