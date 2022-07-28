import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { userInfos }  from '../utils/userinfos';
import { User } from '../utils/types';
import { LookupResponse } from '../utils/types';

export default class DiscordLookupController {

    public async getUserByID (query: string): Promise<LookupResponse> {

        if (!query) return {
            success: false,
            message: 'No query provided',
            data: {
                "id": 0,
                "username": "",
                "avatar": null,
                "banner": null,
                "bannerColor": null,
                "badges": [],
                "timestamp": 0,
                "created": ""
            }
        };

        if (query.length !< 15) return {
            success: false,
            message: 'ID must be 15 characters long',
            data: {
                "id": 0,
                "username": "",
                "avatar": null,
                "banner": null,
                "bannerColor": null,
                "badges": [],
                "timestamp": 0,
                "created": ""
            }
        };

        const regex = /^[0-9]+$/;
        if (!regex.test(<string>query)) return {
            success: false,
            message: 'ID must be a number',
            data: {
                "id": 0,
                "username": "",
                "avatar": null,
                "banner": null,
                "bannerColor": null,
                "badges": [],
                "timestamp": 0,
                "created": ""
            }
        };

        const id: any = query;

        try {
            const response = await axios.get<User>(`https://discord.com/api/v9/users/${id}`, {
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`
                }
            });

            const user = userInfos(response.data);

            // return user data
            return {
                success: true,
                message: 'User found',
                data: user
            };
        } catch {
            const error = new Error("User not found");

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
