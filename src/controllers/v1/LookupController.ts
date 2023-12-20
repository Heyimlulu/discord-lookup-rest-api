import axios from "axios";
import { ProfileData, DiscordUser, MediaContent, UserFlags } from "../../dtos";
import dayjs from "dayjs";
import { Get, Path, Query, Route } from "tsoa";
import { getEnvironmentBaseUrl } from "../../utils/environment";
import * as f from "../../types/user/Flags";
import * as p from "../../types/user/PremiumTypes";

interface LookupResponse {
  status: number;
  success: boolean;
  message?: string;
  data?: ProfileData;
}

@Route("v1/user")
export class LookupController {
  private baseUrl: string = getEnvironmentBaseUrl() + "/static";

  private getUserInfos(data: DiscordUser): ProfileData {
    const {
      id,
      username,
      discriminator,
      global_name,
      avatar,
      bot,
      system,
      banner,
      banner_color,
      premium_type,
      flags,
      avatar_decoration_data,
    } = data;

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


    let flagsList: UserFlags[] = [];
    for (const [key, value] of Object.entries(f.FLAGS)) {
      if ((flags & value) === value) {
        flagsList.push({
          name: f.FLAGS_NAMES[key],
          image: `${this.baseUrl}/${f.FLAGS_NAMES[key].replaceAll(
            " ",
            "_"
          )}.svg`,
        });
      }
    }

    if (
      !flagsList.includes({ name: "Verified Bot", image: "Verified Bot" }) &&
      bot
    ) {
      flagsList.push({ name: "Bot", image: `${this.baseUrl}/Bot.svg` });
    }

    const [key, value] = Object.entries(p.PREMIUM_TYPES)[premium_type];
    if (value !== 0) {
      flagsList.push({
        name: p.PREMIUM_TYPES_NAMES[key],
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
      accentColor: banner_color,
      flags: flagsList,
      timestamp: dayjs(timestamp).valueOf(),
      createdAt: dayjs(timestamp).format("MMMM D YYYY, hh:mm:ss A"),
      accountAge: `${Math.round(dayjs().diff(dayjs(timestamp), "year", true))}`,
    };

    return userInfos;
  }

  @Get("/lookup/{id}")
  public async getUserByID(@Path() id: string): Promise<LookupResponse> {
    if (!id) {
      return {
        status: 400,
        success: false,
        message: "ID is required",
      };
    }

    if (id.length! < 15) {
      return {
        status: 411,
        success: false,
        message: "ID too short",
      };
    }

    if (!/^[0-9]+$/.test(<string>id)) {
      return {
        status: 406,
        success: false,
        message: "Invalid ID",
      };
    }

    const userId: any = id;

    try {
      const response = await axios.get<DiscordUser>(
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
        message: new Error("User not found").message,
      };
    }
  }

  @Get("/decode/{id}")
  public async decodeSnowflake(@Path() id: string) {
      if (!id) {
          return {
              status: 400,
              success: false,
              message: "ID is required"
          }
      }

      if (id.length! < 15) {
          return {
              status: 411,
              success: false,
              message: "ID too short"
          }
      }

      if (!/^[0-9]+$/.test(<string>id)) {
          return {
              status: 406,
              success: false,
              message: "Invalid ID"
          }
      }

      const userId: any = id;
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
  public async calculateSnowflakeDifference(@Query() ids: string[]) {
    if (ids.length !== 2) {
      return {
        status: 400,
        success: false,
        message: "Only two IDs are allowed",
      };
    }

    for (const id of ids) {
      if (id.length < 15) {
        return {
          status: 411,
          success: false,
          message: "ID too short",
        };
      }

      if (!/^[0-9]+$/.test(<string>id)) {
        return {
          status: 406,
          success: false,
          message: "Invalid ID",
        };
      }
    }

    const userIds: any = ids;

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
