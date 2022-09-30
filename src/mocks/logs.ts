import { LogsResponse } from '../utils/DTOs';

export const TODAY_LOGS: LogsResponse = {
    "success": true,
    "message": "Successfully retrieved today logs",
    "data": {
        "id": 1,
        "date": "2022-01-01",
        "count": 10,
        "createdAt": "2022-01-01T00:00:00.000Z",
        "updatedAt": "2022-01-01T00:00:00.000Z"
    }
}