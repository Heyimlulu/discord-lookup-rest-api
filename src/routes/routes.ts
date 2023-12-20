/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ServerController } from './../controllers/v1/ServerController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/v1/UserController';
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Snowflake": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Permissions": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GuildVerificationLevel": {
        "dataType": "refEnum",
        "enums": [0,1,2,3,4],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GuildDefaultMessageNotifications": {
        "dataType": "refEnum",
        "enums": [0,1],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GuildExplicitContentFilter": {
        "dataType": "refEnum",
        "enums": [0,1,2],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "APIRoleTags": {
        "dataType": "refObject",
        "properties": {
            "bot_id": {"ref":"Snowflake"},
            "premium_subscriber": {"dataType":"enum","enums":[null]},
            "integration_id": {"ref":"Snowflake"},
            "subscription_listing_id": {"ref":"Snowflake"},
            "available_for_purchase": {"dataType":"enum","enums":[null]},
            "guild_connections": {"dataType":"enum","enums":[null]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleFlags": {
        "dataType": "refEnum",
        "enums": [1],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "APIRole": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Snowflake","required":true},
            "name": {"dataType":"string","required":true},
            "color": {"dataType":"double","required":true},
            "hoist": {"dataType":"boolean","required":true},
            "icon": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "unicode_emoji": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "position": {"dataType":"double","required":true},
            "permissions": {"ref":"Permissions","required":true},
            "managed": {"dataType":"boolean","required":true},
            "mentionable": {"dataType":"boolean","required":true},
            "tags": {"ref":"APIRoleTags"},
            "flags": {"ref":"RoleFlags","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserFlags": {
        "dataType": "refEnum",
        "enums": [1,2,4,8,16,32,64,128,256,512,1024,8192,16384,65536,131072,262144,524288,1048576,2097152,4194304,17592186044416,1125899906842624,2251799813685248],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserPremiumType": {
        "dataType": "refEnum",
        "enums": [0,1,2,3],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "APIUser": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Snowflake","required":true},
            "username": {"dataType":"string","required":true},
            "discriminator": {"dataType":"string","required":true},
            "global_name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "avatar": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "bot": {"dataType":"boolean"},
            "system": {"dataType":"boolean"},
            "mfa_enabled": {"dataType":"boolean"},
            "banner": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "accent_color": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "locale": {"dataType":"string"},
            "verified": {"dataType":"boolean"},
            "email": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "flags": {"ref":"UserFlags"},
            "premium_type": {"ref":"UserPremiumType"},
            "public_flags": {"ref":"UserFlags"},
            "avatar_decoration": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "APIEmoji": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"union","subSchemas":[{"ref":"Snowflake"},{"dataType":"enum","enums":[null]}],"required":true},
            "name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "animated": {"dataType":"boolean"},
            "roles": {"dataType":"array","array":{"dataType":"refAlias","ref":"Snowflake"}},
            "user": {"ref":"APIUser"},
            "require_colons": {"dataType":"boolean"},
            "managed": {"dataType":"boolean"},
            "available": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GuildFeature": {
        "dataType": "refEnum",
        "enums": ["ANIMATED_BANNER","ANIMATED_ICON","APPLICATION_COMMAND_PERMISSIONS_V2","AUTO_MODERATION","BANNER","COMMUNITY","CREATOR_MONETIZABLE_PROVISIONAL","CREATOR_STORE_PAGE","DEVELOPER_SUPPORT_SERVER","DISCOVERABLE","FEATURABLE","HAS_DIRECTORY_ENTRY","HUB","INVITES_DISABLED","INVITE_SPLASH","LINKED_TO_HUB","MEMBER_VERIFICATION_GATE_ENABLED","MONETIZATION_ENABLED","MORE_STICKERS","NEWS","PARTNERED","PREVIEW_ENABLED","PRIVATE_THREADS","RAID_ALERTS_DISABLED","RELAY_ENABLED","ROLE_ICONS","ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE","ROLE_SUBSCRIPTIONS_ENABLED","TICKETED_EVENTS_ENABLED","VANITY_URL","VERIFIED","VIP_REGIONS","WELCOME_SCREEN_ENABLED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GuildMFALevel": {
        "dataType": "refEnum",
        "enums": [0,1],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GuildSystemChannelFlags": {
        "dataType": "refEnum",
        "enums": [1,2,4,8,16,32],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GuildPremiumTier": {
        "dataType": "refEnum",
        "enums": [0,1,2,3],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "APIGuildWelcomeScreenChannel": {
        "dataType": "refObject",
        "properties": {
            "channel_id": {"ref":"Snowflake","required":true},
            "description": {"dataType":"string","required":true},
            "emoji_id": {"dataType":"union","subSchemas":[{"ref":"Snowflake"},{"dataType":"enum","enums":[null]}],"required":true},
            "emoji_name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "APIGuildWelcomeScreen": {
        "dataType": "refObject",
        "properties": {
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "welcome_channels": {"dataType":"array","array":{"dataType":"refObject","ref":"APIGuildWelcomeScreenChannel"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GuildNSFWLevel": {
        "dataType": "refEnum",
        "enums": [0,1,2,3],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StickerType": {
        "dataType": "refEnum",
        "enums": [1,2],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StickerFormatType": {
        "dataType": "refEnum",
        "enums": [1,2,3,4],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "APISticker": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Snowflake","required":true},
            "pack_id": {"ref":"Snowflake"},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "tags": {"dataType":"string","required":true},
            "asset": {"dataType":"enum","enums":[""]},
            "type": {"ref":"StickerType","required":true},
            "format_type": {"ref":"StickerFormatType","required":true},
            "available": {"dataType":"boolean"},
            "guild_id": {"ref":"Snowflake"},
            "user": {"ref":"APIUser"},
            "sort_value": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GuildHubType": {
        "dataType": "refEnum",
        "enums": [0,1,2],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "APIGuild": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Snowflake","required":true},
            "welcome_screen": {"ref":"APIGuildWelcomeScreen"},
            "name": {"dataType":"string","required":true},
            "icon": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "splash": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "banner": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "features": {"dataType":"array","array":{"dataType":"refEnum","ref":"GuildFeature"},"required":true},
            "verification_level": {"ref":"GuildVerificationLevel","required":true},
            "vanity_url_code": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "icon_hash": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "discovery_splash": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "owner": {"dataType":"boolean"},
            "owner_id": {"ref":"Snowflake","required":true},
            "permissions": {"ref":"Permissions"},
            "region": {"dataType":"string","required":true},
            "afk_channel_id": {"dataType":"union","subSchemas":[{"ref":"Snowflake"},{"dataType":"enum","enums":[null]}],"required":true},
            "afk_timeout": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":[60]},{"dataType":"enum","enums":[300]},{"dataType":"enum","enums":[900]},{"dataType":"enum","enums":[1800]},{"dataType":"enum","enums":[3600]}],"required":true},
            "widget_enabled": {"dataType":"boolean"},
            "widget_channel_id": {"dataType":"union","subSchemas":[{"ref":"Snowflake"},{"dataType":"enum","enums":[null]}]},
            "default_message_notifications": {"ref":"GuildDefaultMessageNotifications","required":true},
            "explicit_content_filter": {"ref":"GuildExplicitContentFilter","required":true},
            "roles": {"dataType":"array","array":{"dataType":"refObject","ref":"APIRole"},"required":true},
            "emojis": {"dataType":"array","array":{"dataType":"refObject","ref":"APIEmoji"},"required":true},
            "mfa_level": {"ref":"GuildMFALevel","required":true},
            "application_id": {"dataType":"union","subSchemas":[{"ref":"Snowflake"},{"dataType":"enum","enums":[null]}],"required":true},
            "system_channel_id": {"dataType":"union","subSchemas":[{"ref":"Snowflake"},{"dataType":"enum","enums":[null]}],"required":true},
            "system_channel_flags": {"ref":"GuildSystemChannelFlags","required":true},
            "rules_channel_id": {"dataType":"union","subSchemas":[{"ref":"Snowflake"},{"dataType":"enum","enums":[null]}],"required":true},
            "max_presences": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "max_members": {"dataType":"double"},
            "premium_tier": {"ref":"GuildPremiumTier","required":true},
            "premium_subscription_count": {"dataType":"double"},
            "preferred_locale": {"dataType":"string","default":"\"en-US\"","required":true},
            "public_updates_channel_id": {"dataType":"union","subSchemas":[{"ref":"Snowflake"},{"dataType":"enum","enums":[null]}],"required":true},
            "max_video_channel_users": {"dataType":"double"},
            "max_stage_video_channel_users": {"dataType":"double"},
            "approximate_member_count": {"dataType":"double"},
            "approximate_presence_count": {"dataType":"double"},
            "nsfw_level": {"ref":"GuildNSFWLevel","required":true},
            "stickers": {"dataType":"array","array":{"dataType":"refObject","ref":"APISticker"},"required":true},
            "premium_progress_bar_enabled": {"dataType":"boolean","required":true},
            "hub_type": {"dataType":"union","subSchemas":[{"ref":"GuildHubType"},{"dataType":"enum","enums":[null]}],"required":true},
            "safety_alerts_channel_id": {"dataType":"union","subSchemas":[{"ref":"Snowflake"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MediaContent": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "url": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserBadges": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "image": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProfileData": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"string","required":true},
            "id": {"dataType":"string","required":true},
            "username": {"dataType":"string","required":true},
            "discriminator": {"dataType":"string","required":true},
            "displayName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "avatar": {"ref":"MediaContent"},
            "isBot": {"dataType":"boolean"},
            "isSystem": {"dataType":"boolean"},
            "banner": {"ref":"MediaContent"},
            "avatarDecoration": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "accentColor": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "badges": {"dataType":"array","array":{"dataType":"refObject","ref":"UserBadges"},"required":true},
            "timestamp": {"dataType":"double","required":true},
            "createdAt": {"dataType":"string","required":true},
            "accountAge": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LookupResponse": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","required":true},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string"},
            "data": {"ref":"ProfileData"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/v1/server/lookup/:serverId',
            ...(fetchMiddlewares<RequestHandler>(ServerController)),
            ...(fetchMiddlewares<RequestHandler>(ServerController.prototype.getServerByID)),

            function ServerController_getServerByID(request: any, response: any, next: any) {
            const args = {
                    serverId: {"in":"path","name":"serverId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ServerController();


              const promise = controller.getServerByID.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/user/lookup/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserByID)),

            function UserController_getUserByID(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.getUserByID.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/user/decode/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.decodeSnowflake)),

            function UserController_decodeSnowflake(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.decodeSnowflake.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/user/calculate-snowflake-difference',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.calculateSnowflakeDifference)),

            function UserController_calculateSnowflakeDifference(request: any, response: any, next: any) {
            const args = {
                    userIds: {"in":"query","name":"userIds","required":true,"dataType":"array","array":{"dataType":"string"}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.calculateSnowflakeDifference.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
