import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import url from 'url';
import { DISCORD_API_ROUTES } from '../utils/enum';

export async function getAuthentificatedUser (req: Request, res: Response, next:NextFunction) {
    return res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/redirect&response_type=code&scope=identify`);
}

export async function authDiscordRedirect (req: Request, res: Response) {
    if (!req.query.code) throw new Error('NoCodeProvided');

    const code = req.query.code;

    try {
        const formData = new url.URLSearchParams({
            client_id: process.env.CLIENT_ID!,
            client_secret: process.env.CLIENT_SECRET!,
            grant_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: 'http://localhost:3000/api/auth/redirect',
        });

        const response = await axios.post(DISCORD_API_ROUTES.OAUTH2_TOKEN,
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        return res.send(response.data);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}
