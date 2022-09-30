# Discord Lookup API

Lookup a Discord User or Bot ID.

## Getting started

### Deploy

```bash
heroku git:remote -a app_name
git push heroku main:main
```

### Versions

| Version | Date | Changes |
| :--------: | :--------: | :--------: |
| `version 1` | 10/16/2021 | Initial deployment |
| `version 2` | 12/12/2021 | Lots of improvement |
| `version 3` | 01/09/2022 | Linked database for logging purposes |
| `version 4` | 01/04/2022 | Introducing users account |

### Endpoints

Endpoint starts at `/`

## API calls

This API supports data response in JSON format.

| Method | Path | What it does |
| :---: | :--------: | :--------: |
| GET | `/user/:id` | Return a Discord user based on his ID |
| GET | `/logs/today` | Return today logs |

