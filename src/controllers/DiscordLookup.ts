import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { userInfos }  from '../utils/userinfos';
import { User } from '../utils/DTOs';
import { LookupResponse, ErrorResponse, ErrorLookupResponse } from '../utils/DTOs';
import { Logs, Lookup } from '../sequelize/sequelize';
import { literal } from "sequelize";
import { datetime } from '../utils/datetime';
import { Get, Query, Response, Route, SuccessResponse } from "tsoa";

@Route('user')
export default class UserController {

    /**
     * Get a Discord user by his ID
     * @param id Discord user ID
     * @returns Discord user data
     */
    @Get('{id}')
    @SuccessResponse("200", "User found")
    @Response<ErrorResponse>("400", "No query provided")
    @Response<ErrorLookupResponse>("404", "User not found")
    @Response<ErrorResponse>("406", "ID must be a number")
    @Response<ErrorResponse>("411", "ID must be 15 characters long")
    public async getUserByID (@Query() id: string): Promise<LookupResponse> {

        if (!id) return {
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

        if (id.length !< 15) return {
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
        if (!regex.test(<string>id)) return {
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

        const userId: any = id;

        if (await Logs.findOne({ where: { date: datetime() } })) {
            await Logs.update({ count: literal('count + 1') }, { where: { date: datetime() }} )
        } else {
            Logs.create({
                date: datetime(),
                count: 1
            }).then((logs: any) => console.log(logs.toJSON()));
        }

        try {
            const response = await axios.get<User>(`https://discord.com/api/v9/users/${userId}`, {
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`
                }
            });

            const user = userInfos(response.data);

            // check if user is a bot
            const isBot: boolean = user.isBot;

            // log user to database
            if (await Lookup.findOne({ where: { userid: userId } })) {
                await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: userId }} )
            } else {
                Lookup.create({
                    userid: userId,
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

            if (await Lookup.findOne({ where: { userid: userId } })) {
                await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: userId }} )
            } else {
                Lookup.create({
                    userid: userId,
                    total_search: 1,
                }).then((lookup: any) => console.log(lookup.toJSON()));
            }

            return {
                success: false,
                message: error.message,
                data: {
                    id: userId,
                    username: '',
                    avatar: null,
                    banner: null,
                    bannerColor: null,
                    badges: [],
                    timestamp: ((userId / 4194304) + 1420070400000),
                    created: new Date(((userId / 4194304) + 1420070400000)).toUTCString()
                }
            };
        }
    }
}
