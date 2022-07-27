import { Logs } from '../sequelize/sequelize';
import { datetime } from '../utils/datetime';

interface DataResponse {
    id: number;
    date: string;
    count: number;
    createdAt: string;
    updatedAt: string;
}

interface LogsResponse {
    success: boolean;
    message: string;
    data: DataResponse | null;
}

export default class LoggingController {

    public async getTodayLogs (): Promise<LogsResponse> {
        try {
            if (Logs.sequelize) {
                const response = await Logs.findOne({ where: { date: datetime() } });

                return {
                    success: true,
                    message: 'Successfully retrieved today logs',
                    data: response ? response.toJSON() : null
                };
            } else {
                return {
                    success: false,
                    message: 'No database connection',
                    data: null
                };
            }

        } catch (err) {
            return {
                success: false,
                message: 'Error retrieving today logs',
                data: null
            }
        }
    }
}
