import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import formatData from '../helpers/format-data';

interface User {
    id: Number;
    username: string;
    avatar: string;
    banner: string;
    bannerColor: string;
    badges: string[];
    timestamp: number;
    creationDate: Date;
}

const getUserById = async (req: Request, res: Response, next:NextFunction) => {
    let id: string = req.params.id;
    try {
        var result: AxiosResponse = await axios.get(`https://discord.com/api/v9/users/${id}`, {
            headers: {
                Authorization: `Bot ${process.env.TOKEN}`
            }
        });
    } catch {
        const error = new Error("User not found");
        return res.status(404).json({
            message: error.message
        })
    }
    let user: [User] = formatData(result.data);
    return res.status(200).json({
        user: user
    });
}

export default { getUserById };
