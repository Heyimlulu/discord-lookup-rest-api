import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import fetchUserInfos  from '../utils/helper';
import { User } from '../utils/types';
import { Logs } from '../sequelize/sequelize';
import { literal } from "sequelize";
import { datetime } from '../utils/datetime';

export default class DiscordApiController {
    static async getRandomUser (req: Request, res: Response, next:NextFunction) {
        // Get a random timestamp from range
        const max = new Date().getTime();
        const min = 1431468000000;
        const rnd = Math.floor(Math.random() * (max - min) + min);
        console.log(rnd);

        // Generate a snowflake ID
        const timestamp: number = rnd;
        const id: number = ((timestamp - 1420070400000) * 4194304);

        try {
            const response = await axios.get<User>(`https://discord.com/api/v9/users/${id}`, {
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`
                }
            });

            let user = fetchUserInfos(response.data);
            return res.json({
                success: true,
                message: 'User found',
                data: user
            });
        } catch {
            const error = new Error("User not found");
            return res.status(404).json({
                success: false,
                message: error.message,
                data: {
                    id,
                    created: new Date(((id / 4194304) + 1420070400000)).toUTCString()
                }
            })
        }
    }

    static async getUserByID (req: Request, res: Response, next:NextFunction) {
        if (!req.query.q) return res.status(400).send('Invalid Discord ID')

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

            let user = fetchUserInfos(response.data);
            return res.json({
                success: true,
                message: 'User found',
                data: user
            });
        } catch {
            const error = new Error("User not found");
            return res.status(404).json({
                success: false,
                message: error.message,
                data: {
                    id,
                    created: new Date(((id / 4194304) + 1420070400000)).toUTCString()
                }
            })
        }
    }
}
