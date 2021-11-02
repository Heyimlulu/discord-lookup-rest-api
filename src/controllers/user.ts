import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import formatData  from '../utils/helper';
import { User } from '../utils/types';

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

    const id = req.query.q;

    console.log(id);

    try {
        const response = await axios.get<User>(`https://discord.com/api/v9/users/${id}`, {
            headers: {
                Authorization: `Bot ${process.env.TOKEN}`
            }
        });

        let user = formatData(response.data);
        return res.json({ user });
    } catch {
        const error = new Error("User not found");
        return res.status(404).json({
            message: error.message
        })
    }
}
