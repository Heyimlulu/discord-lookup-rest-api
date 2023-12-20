import { UserData } from "./User";

export interface Lookup {
    status: number;
    success: boolean;
    message?: string;
    data?: UserData;
}