import { Logs } from '../../sequelize/sequelize';
import { LogsResponse } from '../../dtos';
import { datetime } from '../../utils/datetime';
import { Get, Response, Route, SuccessResponse } from "tsoa";

@Route('v1/logs')
export default class LogsController {

    @Get('today')
    @SuccessResponse('200', 'Successfully retrieved today logs')
    @Response('500', 'Error retrieving today logs')
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
