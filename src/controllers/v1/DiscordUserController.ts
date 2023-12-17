import axios from "axios";
import { UserResponse, LookupResponse, User } from "../../dtos";
// import { Logs, Lookup } from '../../sequelize/sequelize';
// import { literal } from "sequelize";
// import { datetime } from '../../utils/datetime';
import dayjs from "dayjs";
import { getEnvironmentBaseUrl } from "../../utils/environment";
import * as f from "../../types/user/Flags";
import * as p from "../../types/user/PremiumTypes";

interface Flags {
  name: string;
  image: string;
}

export default class DiscordUserController {
  private baseUrl: string = getEnvironmentBaseUrl() + "/static";

  private getUserInfos(data: User): LookupResponse {
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

    let flagsList: Flags[] = [];
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
    // Reverse formula to get the userID
    // const userId: number = ((timestamp - 1420070400000) * 4194304)

    const userInfos: LookupResponse = {
      type,
      id: id,
      username: username,
      discriminator: discriminator,
      displayName: global_name,
      avatar: {
        id: avatar,
        url:
          avatar &&
          `https://cdn.discordapp.com/avatars/${id}/${avatar}.${
            avatar.startsWith("a_") ? "gif" : "png"
          }`,
      },
      isBot: bot,
      isSystem: system,
      banner: {
        id: banner,
        url:
          banner &&
          `https://cdn.discordapp.com/banners/${id}/${banner}.${
            banner.startsWith("a_") ? "gif" : "png"
          }`,
      },
      avatarDecoration:
        avatar_decoration_data &&
        `https://cdn.discordapp.com/avatar-decoration-presets/${avatar_decoration_data.asset}`,
      accentColor: banner_color,
      flags: flagsList.length ? flagsList : [],
      timestamp: dayjs(timestamp).unix(),
      createdAt: dayjs(timestamp).format("MMMM D YYYY, hh:mm:ss A"),
      accountAge: `${Math.round(dayjs().diff(dayjs(timestamp), "year", true))}`,
    };

    return userInfos;
  }

  public async getUserByID(id: string): Promise<UserResponse> {
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

    // if (await Logs.findOne({ where: { date: datetime() } })) {
    //     await Logs.update({ count: literal('count + 1') }, { where: { date: datetime() }} )
    // } else {
    //     Logs.create({
    //         date: datetime(),
    //         count: 1
    //     }).then((logs: any) => console.log(logs.toJSON()));
    // }

    try {
      const response = await axios.get<User>(
        `https://discord.com/api/v10/users/${userId}`,
        {
          headers: {
            Authorization: `Bot ${process.env.TOKEN}`,
          },
        }
      );

      const data = this.getUserInfos(response.data);

      // log user to database
      // if (await Lookup.findOne({ where: { userid: userId } })) {
      //     await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: userId }} )
      // } else {
      //     Lookup.create({
      //         userid: userId,
      //         total_search: 1,
      //         does_exist: true,
      //         is_bot: isBot
      //     }).then((lookup: any) => console.log(lookup.toJSON()));
      // }

      return {
        status: 200,
        success: true,
        data,
      };
    } catch {
      // if (await Lookup.findOne({ where: { userid: userId } })) {
      //     await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: userId }} )
      // } else {
      //     Lookup.create({
      //         userid: userId,
      //         total_search: 1,
      //     }).then((lookup: any) => console.log(lookup.toJSON()));
      // }

      return {
        status: 404,
        success: false,
        message: new Error("User not found").message,
      };
    }
  }
}
