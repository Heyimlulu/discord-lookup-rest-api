import axios from "axios";
import { APIGuild } from "discord-api-types/v10";
import dayjs from "dayjs";
import { Get, Path, Route, Tags } from "tsoa";

@Route("v1/server")
@Tags("Server")
export class ServerController {
  @Get("/lookup/{serverId}")
  public async getServerByID(@Path() serverId: string) {
    if (!serverId) {
      return {
        status: 400,
        success: false,
        message: "ID is required",
      };
    }

    if (serverId.length! < 15) {
      return {
        status: 411,
        success: false,
        message: "ID too short",
      };
    }

    if (!/^[0-9]+$/.test(<string>serverId)) {
      return {
        status: 406,
        success: false,
        message: "Invalid ID",
      };
    }

    try {
      const response = await axios.get<APIGuild>(
        `https://discord.com/api/v10/guilds/${serverId}/preview`,
        {
          headers: {
            Authorization: `Bot ${process.env.TOKEN}`,
          },
        }
      );

      return {
        status: 200,
        success: true,
        data: response.data,
      };
    } catch {
      return {
        status: 404,
        success: false,
        message: new Error("Server not found").message,
      };
    }
  }
}
