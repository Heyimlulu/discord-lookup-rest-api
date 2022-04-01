# Discord Lookup API

Lookup a Discord User or Bot ID.

## Getting started

The current version of the API lives at `https://discord-lookup-api.herokuapp.com/`.

### Versions

| Version | Date | Changes |
| :--------: | :--------: | :--------: |
| `version 1` | 10/16/2021 | Initial deployment |
| `version 2` | 12/12/2021 | Lots of improvement |
| `version 3` | 01/09/2022 | Linked database for logging purposes |
| `version 4` | 01/04/2022 | Introducing users account |

### Endpoints

Endpoint starts at `/api`

## API calls

This API supports data response in JSON format.

### GET requests

| Method | URL | What it does |
| :---: | :--------: | :--------: |
| GET | `/user/profile/:id` | Return a Discord user based on his ID |
| GET | `/user/random` | Return a random Discord user based by generating a random snowflake ID |
| GET | `/logs` | Return all logs |
| GET | `/logs/today` | Return today logs |
| GET | `/logs/:date` | Return logs by date |
| POST | `/login` | Sign in to the API |
| POST | `/register` | Sign up to the API |

## Example response

### On success

```json
{
  "success": true,
  "message": "User found",
  "data": {
    "id": 265896171384340480,
    "username": "Lulu 🍉#0001",
    "avatar": "https://cdn.discordapp.com/avatars/265896171384340480/a_b13ecb6f76a048d9309639a45b1c7176",
    "banner": "https://cdn.discordapp.com/banners/265896171384340480/a_70de5d8e8c59a6ae588eca92fc0d58ff",
    "bannerColor": "#8f7cff",
    "badges": [
      "House_Bravery",
      "Early_Supporter"
    ],
    "timestamp": 1483464987,
    "creationDate": "Tue, 03 Jan 2017 17:36:27 GMT"
  }
}
```

### On error

```json
{
  "success": false,
  "message": "User not found",
  "data": {
    "id": "1122334455667788990",
    "created": "Sun, 25 Jun 2023 01:16:26 GMT"
  }
}
```
