# Discord Lookup API

Lookup a Discord User or Bot ID.

## Getting started

### Deployement

```bash
docker run -d \
-p 8080:8080 \
-e TOKEN="OTAwMDY5NDg0MjEwMDMyNzEx.Gba1up.FjfACbNqixhh9Owjjzl8awsNTXLIm0tihDJIUw" \
-e NODE_ENV="" \
--name discord-lookup-api \
--restart unless-stopped luluisdoingstuffs/discord-lookup-api
```

## Example status 200 Response

```
{
    "status": 200,
    "success": true,
    "data": {
        "type": "USER",
        "id": "265896171384340480",
        "username": "sharkycute",
        "discriminator": "0",
        "displayName": "Lulu",
        "avatar": {
            "id": "a_eb51728e7a862ed6a83086133c7debcf",
            "url": "https://cdn.discordapp.com/avatars/265896171384340480/a_eb51728e7a862ed6a83086133c7debcf.gif"
        },
        "banner": {
            "id": "d4747842aac014ebb73586abe92f7508",
            "url": "https://cdn.discordapp.com/banners/265896171384340480/d4747842aac014ebb73586abe92f7508.png"
        },
        "avatarDecoration": "https://cdn.discordapp.com/avatar-decoration-presets/a_e11ac0d3f2b1301173847b84a1a3268f",
        "accentColor": "#8f7cff",
        "flags": [
            {
                "name": "House Bravery Member",
                "image": "http://localhost:3000/static/House_Bravery_Member.svg"
            },
            {
                "name": "Early Nitro Supporter",
                "image": "http://localhost:3000/static/Early_Nitro_Supporter.svg"
            },
            {
                "name": "Active Developer",
                "image": "http://localhost:3000/static/Active_Developer.svg"
            },
            {
                "name": "Nitro",
                "image": "http://localhost:3000/static/Nitro.svg"
            }
        ],
        "timestamp": 1483464987,
        "createdAt": "January 3 2017, 06:36:27 PM",
        "accountAge": "7"
    }
}
```
