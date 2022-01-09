import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import formatData  from '../utils/helper';
import { User } from '../utils/types';
import { Logs } from '../sequelize/sequelize';
import { literal } from "sequelize";
import { dateFormatter } from '../utils/datetime';

/*
export async function getUser (req: Request, res: Response) {
    try {
        const { accessToken } = req.params;
        const response = await axios.get('https://discord.com/api/v9/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.json(response.data);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}
*/

export async function getUserById (req: Request, res: Response, next:NextFunction) {
    if (!req.query.q) return res.status(400).send('Invalid Discord ID')

    const id: any = req.query.q;

    if (await Logs.findOne({ where: { date: dateFormatter() } })) {
        await Logs.update({ count: literal('count + 1') }, { where: { date: dateFormatter() }} )
    } else {
        Logs.create({
            date: dateFormatter(),
            count: 1
        }).then((logs: any) => console.log(logs.toJSON()));
    }

    try {
        const response = await axios.get<User>(`https://discord.com/api/v9/users/${id}`, {
            headers: {
                Authorization: `Bot ${process.env.TOKEN}`
            }
        });

        let user = formatData(response.data);
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
