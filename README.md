# Discord Lookup API

Lookup a Discord User or Bot ID.

## Getting started

The current version of the API lives at `http://api.paanya.moe/`.

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

#### Example output

```
{
  "data": {
    "id": "",
    "username": "",
    "avatar": "",
    "banner": "",
    "bannerColor": "",
    "badges": []
  }
}
```
