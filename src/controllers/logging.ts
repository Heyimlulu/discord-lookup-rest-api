import { Request, Response } from 'express';
import Op from 'sequelize/lib/operators';
import { Logs } from '../sequelize/sequelize';
import { datetime } from '../utils/datetime';

export default class LoggingController {
    static async getTodayLogs (req: Request, res: Response) {
        try {
            const response = await Logs.findOne({ where: { date: datetime() } });

            return res.json({
                success: true,
                message: 'Successfully retrieved today logs',
                data: response
            });
        } catch (err) {
            console.error(err);
            return res.sendStatus(400);
        }
    }

    static async getAllLogs (req: Request, res: Response) {
        try {
            const response = await Logs.findAndCountAll({ order: [['id', 'ASC']] });

            return res.json({
                success: true,
                message: 'Successfully retrieved all logs',
                data: response
            });
        } catch (err) {
            console.error(err);
            return res.sendStatus(400);
        }
    }

    static async getLogsByYear (req: Request, res: Response) {
        try {
            const { year } = req.params;

            const response = await Logs.findAndCountAll({ where: { date: { [Op.like]: `${year}%` } }, order: [['id', 'ASC']] });
            return res.json({
                success: true,
                message: 'Successfully retrieved logs by year',
                data: response
            });
        } catch (err) {
            console.error(err);
            return res.sendStatus(400);
        }
    }

    static async getLogsByYearAndMonth (req: Request, res: Response) {
        try {
            const { year, month } = req.params;

            const response = await Logs.findAndCountAll({
                where: { date: { [Op.like]: `%${year}-${month}%` }},
                order: [['id', 'ASC']]
            });

            return res.json({
                success: true,
                message: 'Successfully retrieved logs by year and month',
                data: response
            });
        } catch (err) {
            console.error(err);
            return res.sendStatus(400);
        }
    }
}
