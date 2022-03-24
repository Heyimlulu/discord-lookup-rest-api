import { DISCORD_API_ROUTES } from '../utils/enum';

export function isProd () {
    if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
        return `https://api.lookup.social:${process.env.PORT}${DISCORD_API_ROUTES.OAUTH2_REDIRECT}`;
    } else {
        return `http://localhost:3000${DISCORD_API_ROUTES.OAUTH2_REDIRECT}`
    }
}
