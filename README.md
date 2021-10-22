# Discord Lookup API

Lookup a Discord User or Bot ID.

## Getting started

The current version of the API lives at `https://paanya.moe/`.

### Versions

| Version | Date | Changes |
| :--------: | :--------: | :--------: |
| `version 1` | 10/16/2021 | Initial deployment |

### Endpoints

| Endpoint | What it does |
| :--------: | :--------: |
| `/users/:id` | Return a Discord user based on his ID |

## API calls

This API supports data response in JSON format.

### GET /users/:id

| Parameter | Value | Description | Parameter Type | Data Type |
| :--------: | :--------: | :--------: | :--------: | :--------: |
| id | `required` | userID | - | Integer

#### Example response

```
{
  "user": {
    "id": 265896171384340480,
    "username": "Slimey#0667",
    "avatar": "https://cdn.discordapp.com/avatars/265896171384340480/a_f33a32c8e44b8c0246e5433b8c0edb65",
    "banner": "https://cdn.discordapp.com/banners/265896171384340480/0dab7cfebe53dd7549fd84774a07ed78",
    "bannerColor": "#8f7cff",
    "badges": [
      "House_Bravery",
      "Early_Supporter"
    ],
    "timestamp": 1483464987370,
    "creationDate": "Tuesday, January 3, 2017, 5:36 PM"
  }
}
```
