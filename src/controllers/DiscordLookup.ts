import { Request } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { userInfos }  from '../utils/userinfos';
import { User } from '../utils/types';
import { Logs, Lookup } from '../sequelize/sequelize';
import { literal } from "sequelize";
import { datetime } from '../utils/datetime';

interface DataResponse {
    id: number;
    username: string;
    avatar: string | null;
    isBot?: boolean;
    banner: string | null;
    bannerColor: string | null;
    badges: string[];
    timestamp: number | null;
    created: string;
}

interface LookupResponse {
    success: boolean;
    message: string;
    data: DataResponse | null;
}

export default class DiscordLookupController {

    public async getUserByID (req: Request): Promise<LookupResponse> {

        if (!req.query.q) return {
            success: false,
            message: 'No query provided',
            data: null
        };

        if (req.query.q.length !< 15) return{
            success: false,
            message: 'ID must be 15 characters long',
            data: null
        };

        const regex = /^[0-9]+$/;
        if (!regex.test(<string>req.query.q)) return {
            success: false,
            message: 'ID must be a number',
            data: null
        };

        const id: any = req.query.q;

        if (await Logs.findOne({ where: { date: datetime() } })) {
            await Logs.update({ count: literal('count + 1') }, { where: { date: datetime() }} )
        } else {
            Logs.create({
                date: datetime(),
                count: 1
            }).then((logs: any) => console.log(logs.toJSON()));
        }

        try {
            const response = await axios.get<User>(`https://discord.com/api/v9/users/${id}`, {
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`
                }
            });

            const user = userInfos(response.data);

            // check if user is a bot
            const isBot: boolean = user.isBot;

            // log user to database
            if (await Lookup.findOne({ where: { userid: id } })) {
                await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: id }} )
            } else {
                Lookup.create({
                    userid: id,
                    total_search: 1,
                    does_exist: true,
                    is_bot: isBot
                }).then((lookup: any) => console.log(lookup.toJSON()));
            }

            // return user data
            return {
                success: true,
                message: 'User found',
                data: user
            };
        } catch {
            const error = new Error("User not found");

            if (await Lookup.findOne({ where: { userid: id } })) {
                await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: id }} )
            } else {
                Lookup.create({
                    userid: id,
                    total_search: 1,
                }).then((lookup: any) => console.log(lookup.toJSON()));
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
