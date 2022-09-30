import { LookupResponse, ErrorResponse } from '../utils/DTOs';

export const USER_FOUND: LookupResponse  = {
    "success": true,
    "message": "User found",
    "data": {
        "id": 265896171384340480,
        "username": "Lυlυ#1337",
        "avatar": "https://cdn.discordapp.com/avatars/265896171384340480/51b4beabba947f2e4eded24d70b64f52",
        "banner": "https://cdn.discordapp.com/banners/265896171384340480/a_fe20be905fbc6e620e774b6f725e48f2",
        "bannerColor": "#8f7cff",
        "badges": [
        "House_Bravery",
        "Early_Supporter"
        ],
        "timestamp": 1483464987,
        "created": "Tue, 03 Jan 2017 17:36:27 GMT"
    }
}

export const USER_NOT_FOUND: LookupResponse = {
    "success": false,
    "message": "User not found",
    "data": {
        "id": 112233445566778899,
        "username": "unknown",
        "avatar": null,
        "banner": null,
        "bannerColor": null,
        "badges": [
        
        ],
        "timestamp": 1426409858736.9998,
        "created": "Sun, 15 Mar 2015 08:57:38 GMT"
    }
}

export const NO_QUERY: ErrorResponse = {
    "success": false,
    "message": "No query provided",
}

export const QUERY_TOO_SHORT: ErrorResponse = {
    "success": false,
    "message": "ID length must be 15 characters",
}

export const QUERY_NOT_NUMBER: ErrorResponse = {
    "success": false,
    "message": "ID must be a number",
}