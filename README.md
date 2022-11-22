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
