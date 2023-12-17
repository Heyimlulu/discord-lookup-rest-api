import { Logs } from '../../sequelize/sequelize';
import { LogsResponse } from '../../dtos';
import { datetime } from '../../utils/datetime';

export default class LogsController {

    public async getTodayLogs (): Promise<LogsResponse> {
        try {
            const response = await Logs.findOne({ where: { date: datetime() } });

            return {
                status: 200,
                message: 'Successfully retrieved today logs',
                data: response?.toJSON(),
            };
        } catch (err) {
            return {
                status: 500,
                message: 'Error retrieving today logs',
            }
        }
    }
}
