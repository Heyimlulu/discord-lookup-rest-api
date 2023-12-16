export interface LogsResponse {
    status: number;
    message: string;
    data?: Logs;
}

interface Logs {
    id: number;
    date: string;
    count: number;
    createdAt: string;
    updatedAt: string;
}