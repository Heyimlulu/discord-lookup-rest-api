import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { userInfos }  from '../utils/userinfos';
import { User } from '../utils/types';
import { Logs, Lookup } from '../sequelize/sequelize';
import { literal } from "sequelize";
import { datetime } from '../utils/datetime';
import { LookupResponse } from '../utils/types';

export default class DiscordLookupController {

    public async getUserByID (query: string): Promise<LookupResponse> {

        if (!query) return {
            success: false,
            message: 'No query provided',
            data: {
                "id": 0,
                "username": "unknown",
                "avatar": null,
                "banner": null,
                "bannerColor": null,
                "badges": [],
                "timestamp": 0,
                "created": "Thu, 23 Nov 4023 15:36:10 GMT"
            }
        };

        if (query.length !< 15) return {
            success: false,
            message: 'ID must be 15 characters long',
            data: {
                "id": 0,
                "username": "unknown",
                "avatar": null,
                "banner": null,
                "bannerColor": null,
                "badges": [],
                "timestamp": 0,
                "created": "Thu, 23 Nov 4023 15:36:10 GMT"
            }
        };

        const regex = /^[0-9]+$/;
        if (!regex.test(<string>query)) return {
            success: false,
            message: 'ID must be a number',
            data: {
                "id": 0,
                "username": "unknown",
                "avatar": null,
                "banner": null,
                "bannerColor": null,
                "badges": [],
                "timestamp": 0,
                "created": "Thu, 23 Nov 4023 15:36:10 GMT"
            }
        };

        const id: any = query;

        // check if db is connected
        if (Logs.sequelize) {
            if (await Logs.findOne({ where: { date: datetime() } })) {
                await Logs.update({ count: literal('count + 1') }, { where: { date: datetime() }} )
            } else {
                Logs.create({
                    date: datetime(),
                    count: 1
                }).then((logs: any) => console.log(logs.toJSON()));
            }
        }

        try {
            const response = await axios.get<User>(`https://discord.com/api/v9/users/${id}`, {
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`
                }
            });

            const user = userInfos(response.data);

            if (!Lookup.sequelize) {
                // log user to database
                if (await Lookup.findOne({ where: { userid: id } })) {
                    await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: id }} )
                } else {
                    Lookup.create({
                        userid: id,
                        total_search: 1,
                        does_exist: true, // check if user is a bot
                        is_bot: user.isBot,
                    }).then((lookup: any) => console.log(lookup.toJSON()));
                }
            }

            // return user data
            return {
                success: true,
                message: 'User found',
                data: user
            };
        } catch {
            const error = new Error("User not found");

            if (!Lookup.sequelize) {
                if (await Lookup.findOne({ where: { userid: id } })) {
                    await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: id }} )
                } else {
                    Lookup.create({
                        userid: id,
                        total_search: 1,
                    }).then((lookup: any) => console.log(lookup.toJSON()));
                }
            }

            return {
                success: false,
                message: error.message,
                data: {
                    id,
                    username: 'unknown',
                    avatar: null,
                    banner: null,
                    bannerColor: null,
                    badges: [],
                    timestamp: ((id / 4194304) + 1420070400000),
                    created: new Date(((id / 4194304) + 1420070400000)).toUTCString()
                }
            };
        }
    }
}
