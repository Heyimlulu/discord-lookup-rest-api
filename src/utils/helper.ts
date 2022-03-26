const fetchUserInfos = (data: any): object => {

    const badgesList = [
        ["Discord_Employee", 1 << 0],
        ["Partnered_Server_Owner", 1 << 1],
        ["HypeSquad_Events", 1 << 2],
        ["Bug_Hunter_Level_1", 1 << 3],
        ["House_Bravery", 1 << 6],
        ["House_Brilliance", 1 << 7],
        ["House_Balance", 1 << 8],
        ["Early_Supporter", 1 << 9],
        ["Team_User", 1 << 10],
        ["Bug_Hunter_Level_2", 1 << 14],
        ["Verified_Bot", 1 << 16],
        ["Early_Verified_Bot_Developer", 1 << 17],
        ["Discord_Certified_Moderator", 1 << 18]
    ]

    // Destructuring
    const { id, username, avatar, discriminator, public_flags, bot, banner, banner_color } = data;

    // Badges
    let badges: Array<string> = [];

    for (let i = 0; i < badgesList.length; i++) {
        // @ts-ignore
        if ((public_flags & badgesList[i][1]) == badgesList[i][1]){
            // @ts-ignore
            badges.push(badgesList[i][0]);
        }
    }

    // IF => Is Bot and doesn't have the verified badge, then add the default Bot badge
    if (!badges.includes('Verified_Bot') && bot) badges.push('Bot');

    // IF => User has a valid avatar
    let avatarURL: any = null;
    if (avatar) avatarURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}`;

    // IF => User has a valid banner
    let bannerURL: any = null;
    if (banner) bannerURL = `https://cdn.discordapp.com/banners/${id}/${banner}`;

    // Converts a snowflake ID into a JavaScript Date object using the Discord's epoch (in ms)
    const timestamp: number = ((id / 4194304) + 1420070400000);

    // Reverse formula to get the userID
    // console.log(((timestamp - 1420070400000) * 4194304));

    let response = {
        "id": parseInt(id),
        "username": `${username}#${discriminator}`,
        "avatar": avatarURL,
        "banner": bannerURL,
        "bannerColor": banner_color,
        "badges": badges,
        "timestamp": Math.round(new Date(timestamp).getTime() / 1000),
        "created": new Date(timestamp).toUTCString()
    }

    return response;
}

export default fetchUserInfos;
