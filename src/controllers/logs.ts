import { Request, Response } from 'express';
import { Logs } from '../sequelize/sequelize';
import { dateFormatter } from '../utils/datetime';

export async function getTodayStats (req: Request, res: Response) {
    try {
        const response = await Logs.findOne({ where: { date: dateFormatter() } });

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
