import { DISCORD_API_ROUTES } from '../utils/enum';

export function isProd () {
    if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
        return DISCORD_API_ROUTES.OAUTH2_REDIRECT;
    } else {
        return DISCORD_API_ROUTES.OAUTH2_REDIRECT_DEV;
    }
}
