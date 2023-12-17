import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { SearchResponse, User } from '../../dtos';
// import { Logs, Lookup } from '../../sequelize/sequelize';
// import { literal } from "sequelize";
// import { datetime } from '../../utils/datetime';
import dayjs from 'dayjs';

export default class DiscordUserController {

    private getUserInfos (data: User) {
        const { id, username, discriminator, global_name, avatar, bot, system, banner, accent_color, premium_type, flags } = data;

        const USER_FLAGS = {
            DISCORD_EMPLOYEE: 1 << 0,
            PARTNERED_SERVER_OWNER: 1 << 1,
            HYPESQUAD_EVENTS_MEMBER: 1 << 2,
            BUG_HUNTER_LEVEL_1: 1 << 3,
            HYPESQUAD_HOUSE_BRAVERY: 1 << 6, 
            HYPESQUAD_HOUSE_BRILLANCE: 1 << 7, 
            HYPESQUAD_HOUSE_BALANCE: 1 << 8, 
            EARLY_NITRO_SUPPORTER: 1 << 9,
            TEAM_PSEUDO_USER: 1 << 10,
            BUG_HUNTER_LEVEL_2: 1 << 14,
            VERIFIED_BOT: 1 << 16,
            EARLY_VERIFIED_BOT_DEVELOPER: 1 << 17,
            CERTIFIED_MODERATOR: 1 << 18,
            BOT_HTTP_INTERACTIONS: 1 << 19,
            ACTIVE_DEVELOPER: 1 << 22
        };

        const PREMIUM_TYPES = {
            NONE: 0,
            NITRO_CLASSIC: 1,
            NITRO: 2,
            NITRO_BASIC: 3,
        };

        let badges: string[] = [];
        for (const [badge, value] of Object.entries(USER_FLAGS)) {
            if ((flags & value) === value) {
                badges.push(badge);
            }
        }
        
        if (!badges.includes('VERIFIED_BOT') && bot) {
            badges.push('BOT')
        };

        // Converts a snowflake ID into a JavaScript Date object using the Discord's epoch (in ms)
        let timestamp: number = ((parseInt(id) / 4194304) + 1420070400000);
        // Reverse formula to get the userID
        // const userId: number = ((timestamp - 1420070400000) * 4194304)

        let lang = dayjs().locale()

        return {
            id: id,
            username: username,
            discriminator: discriminator,
            globalName: global_name || null,
            avatar: avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}` : null,
            bot: bot ? true : false,
            system: system ? true : false,
            banner: banner ? `https://cdn.discordapp.com/banners/${id}/${banner}` : null,
            accentColor: accent_color?.toString(16) || null,
            premiumType: Object.keys(PREMIUM_TYPES)[premium_type],
            badges: badges.length ? badges : [],
            timestamp: dayjs(timestamp).unix(),
            created: dayjs(timestamp).locale(lang).format('dddd, MMMM D, YYYY h:mm A'),
        }
    }

    public async getUserByID (id: string): Promise<SearchResponse> {

        if (!id) {
            return {
                status: 400,
                message: 'No query provided',
            }
        }

        if (id.length !< 15) {
            return {
                status: 411,
                message: 'ID must be 15 characters long',
            }
        }

        if (!/^[0-9]+$/.test(<string>id))  {
            return {
                status: 406,
                message: 'ID must be a number',
            }
        }

        const userId: any = id;

        // if (await Logs.findOne({ where: { date: datetime() } })) {
        //     await Logs.update({ count: literal('count + 1') }, { where: { date: datetime() }} )
        // } else {
        //     Logs.create({
        //         date: datetime(),
        //         count: 1
        //     }).then((logs: any) => console.log(logs.toJSON()));
        // }

        try {
            const response = await axios.get<User>(`https://discord.com/api/v10/users/${userId}`, {
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`
                }
            });

            const data = this.getUserInfos(response.data);

            // log user to database
            // if (await Lookup.findOne({ where: { userid: userId } })) {
            //     await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: userId }} )
            // } else {
            //     Lookup.create({
            //         userid: userId,
            //         total_search: 1,
            //         does_exist: true,
            //         is_bot: isBot
            //     }).then((lookup: any) => console.log(lookup.toJSON()));
            // }

            // return user data
            return {
                status: 200,
                message: 'User found',
                data
            };
        } catch {
            const error = new Error("User not found");

            // if (await Lookup.findOne({ where: { userid: userId } })) {
            //     await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: userId }} )
            // } else {
            //     Lookup.create({
            //         userid: userId,
            //         total_search: 1,
            //     }).then((lookup: any) => console.log(lookup.toJSON()));
            // }

            return {
                status: 404,
                message: error.message,
            };
        }
    }
}
