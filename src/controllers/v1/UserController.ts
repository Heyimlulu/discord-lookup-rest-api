import axios from "axios";
import { APIUser, UserFlags } from "discord-api-types/v10";
import { ProfileData, UserBadges, MediaContent } from "../../dtos";
import dayjs from "dayjs";
import { Get, Path, Query, Route, Tags } from "tsoa";
import { getEnvironmentBaseUrl } from "../../utils/environment";
import { USER_BADGES_FLAGS, USER_BADGES_FLAGS_NAMES } from "../../types/user/Flags";
import { PREMIUM_TYPES, PREMIUM_TYPES_NAMES } from "../../types/user/PremiumTypes";
import { convertColor } from "../../helpers/color";
import { removeEmptyFields } from "../../utils/emptyObject";

interface LookupResponse {
  status: number;
  success: boolean;
  message?: string;
  data?: ProfileData;
}

@Route("v1/user")
@Tags("User")
export class UserController {
  private baseUrl: string = getEnvironmentBaseUrl() + "/static";

  private getUserInfos(apiUser): ProfileData {    
    const {
      id,
      username,
      discriminator,
      global_name,
      avatar,
      bot,
      system,
      banner,
      accent_color,
      premium_type,
      flags,
      avatar_decoration_data,
    } = apiUser;

    const type = !bot ? "USER" : system ? "SYSTEM" : "BOT";

    const avatarMedia: MediaContent = {
      id: avatar,
      url:
        avatar &&
        `https://cdn.discordapp.com/avatars/${id}/${avatar}.${
          avatar.startsWith("a_") ? "gif" : "png"
        }`,
    };

    const bannerMedia: MediaContent = {
      id: banner,
      url:
        banner &&
        `https://cdn.discordapp.com/banners/${id}/${banner}.${
          banner.startsWith("a_") ? "gif" : "png"
        }`,
    };


    let badgesList: UserBadges[] = [];
    for (const badgeFlag of Object.values(USER_BADGES_FLAGS) as number[]) {            
      if ((flags! & badgeFlag) === badgeFlag) {
        const badgeName = USER_BADGES_FLAGS_NAMES[USER_BADGES_FLAGS[badgeFlag]];
        badgesList.push({
          name: badgeName,
          image: `${this.baseUrl}/${badgeName.replaceAll(
            " ",
            "_"
          )}.svg`,
        });
      }
    }
    
    if (!badgesList.includes({ name: "Verified Bot", image: "Verified Bot" }) && bot) {
      badgesList.push({ name: "Bot", image: `${this.baseUrl}/Bot.svg` });
    }

    const premium = Object.values(PREMIUM_TYPES)[premium_type!];    
    if (premium !== "NONE") {
      badgesList.push({
        name: PREMIUM_TYPES_NAMES[premium],
        image: `${this.baseUrl}/Nitro.svg`,
      });
    }

    // Converts a snowflake ID into a JavaScript Date object using the Discord's epoch (in ms)
    let timestamp: number = parseInt(id) / 4194304 + 1420070400000;

    const userInfos: ProfileData = {
      type,
      id: id,
      username: username,
      discriminator: discriminator,
      displayName: global_name,
      avatar: avatarMedia,
      isBot: bot,
      isSystem: system,
      banner: bannerMedia,
      avatarDecoration:
      avatar_decoration_data &&
        `https://cdn.discordapp.com/avatar-decoration-presets/${avatar_decoration_data.asset}`,
      accentColor: convertColor(accent_color),
      badges: badgesList,
      timestamp: dayjs(timestamp).valueOf(),
      createdAt: dayjs(timestamp).format("MMMM D YYYY, hh:mm:ss A"),
      accountAge: `${Math.round(dayjs().diff(dayjs(timestamp), "year", true))}`,
    };

    return removeEmptyFields(userInfos);
  }

  @Get("/lookup/{userId}")
  public async getUserByID(@Path() userId: string): Promise<LookupResponse> {
    if (!userId) {
      return {
        status: 400,
        success: false,
        message: "ID is required",
      };
    }

    if (userId.length! < 15) {
      return {
        status: 411,
        success: false,
        message: "ID too short",
      };
    }

    if (!/^[0-9]+$/.test(<string>userId)) {
      return {
        status: 406,
        success: false,
        message: "Invalid ID",
      };
    }

    try {
      const response = await axios.get<APIUser>(
        `https://discord.com/api/v10/users/${userId}`,
        {
          headers: {
            Authorization: `Bot ${process.env.TOKEN}`,
          },
        }
      );

      const data = this.getUserInfos(response.data);

      return {
        status: 200,
        success: true,
        data,
      };
    } catch {
      return {
        status: 404,
        success: false,
        message: "User not found",
      };
    }
  }

  @Get("/decode/{userId}")
  public async decodeSnowflake(@Path() userId: string) {
      if (!userId) {
          return {
              status: 400,
              success: false,
              message: "ID is required"
          }
      }

      if (userId.length! < 15) {
          return {
              status: 411,
              success: false,
              message: "ID too short"
          }
      }

      if (!/^[0-9]+$/.test(<string>userId)) {
          return {
              status: 406,
              success: false,
              message: "Invalid ID"
          }
      }

      const timestamp: number = parseInt(userId) / 4194304 + 1420070400000;
      const difference: number = Math.abs(dayjs().valueOf() - timestamp);

      return {
          status: 200,
          success: true,
          data: {
            user: {
              id: userId,
              timestamp: dayjs(timestamp).valueOf(),
              createdAt: dayjs(timestamp).format("MMMM D YYYY, hh:mm:ss A"),
              accountAge: `${Math.round(dayjs().diff(dayjs(timestamp), "year", true))}`,
            },
            difference: {
              years: dayjs(difference).year() - 1970,
              months: dayjs(difference).month(),
              days: dayjs(difference).day(),
              hours: dayjs(difference).hour(),
              minutes: dayjs(difference).minute(),
              seconds: dayjs(difference).second(),
              milliseconds: dayjs(difference).millisecond(),
          }
        }
      }
  }

  @Get("/calculate-snowflake-difference")
  public async calculateSnowflakeDifference(@Query() userIds: string[]) {
    if (userIds.length !== 2) {
      return {
        status: 400,
        success: false,
        message: "Only two IDs are allowed",
      };
    }

    for (const userId of userIds) {
      if (userId.length < 15) {
        return {
          status: 411,
          success: false,
          message: "ID too short",
        };
      }

      if (!/^[0-9]+$/.test(<string>userId)) {
        return {
          status: 406,
          success: false,
          message: "Invalid ID",
        };
      }
    }

    const timestamp1: number = parseInt(userIds[0]) / 4194304 + 1420070400000;
    const timestamp2: number = parseInt(userIds[1]) / 4194304 + 1420070400000;

    const difference: number = Math.abs(timestamp1 - timestamp2);

    return {
      status: 200,
      success: true,
      data: {
        users: [
          {
            id: userIds[0],
            timestamp: dayjs(timestamp1).valueOf(),
            createdAt: dayjs(timestamp1).format("MMMM D YYYY, hh:mm:ss A"),
            accountAge: `${Math.round(
              dayjs().diff(dayjs(timestamp1), "year", true)
            )}`,
          },
          {
            id: userIds[1],
            timestamp: dayjs(timestamp2).valueOf(),
            createdAt: dayjs(timestamp2).format("MMMM D YYYY, hh:mm:ss A"),
            accountAge: `${Math.round(
              dayjs().diff(dayjs(timestamp2), "year", true)
            )}`,
          }
        ],
        difference: {
          years: dayjs(difference).year() - 1970,
          months: dayjs(difference).month(),
          days: dayjs(difference).day(),
          hours: dayjs(difference).hour(),
          minutes: dayjs(difference).minute(),
          seconds: dayjs(difference).second(),
          milliseconds: dayjs(difference).millisecond(),
        }
      },
    };
  }
}
