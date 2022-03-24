import { Request, Response } from 'express';
import { Logs } from '../sequelize/sequelize';
import { datetime } from '../utils/datetime';

export default class LoggingController {
    static async getTodayStats (req: Request, res: Response) {
        try {
            const response = await Logs.findOne({ where: { date: datetime() } });

            return res.json({
                success: true,
                message: 'Successfully retrieved today logs',
                data: response
            });
        } catch (err) {
            console.log(err);
            return res.sendStatus(400);
        }
    }
}
