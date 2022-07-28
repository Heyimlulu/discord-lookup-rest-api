import { Router } from 'express';
import DiscordLookupController  from '../controllers/DiscordLookup';
import LoggingController from '../controllers/logging';
// import AccountController from '../controllers/account';
// import { verifyToken } from '../oauth';
import { Logs, Lookup } from '../sequelize/sequelize';
import { literal } from "sequelize";
import { datetime } from '../utils/datetime';

const router = Router();

//router.post('/login', AccountController.authentification);
//router.post('/register', AccountController.registration);

router.get('/user/:id', async (req, res) => {
    const controller = new DiscordLookupController();
    const response = await controller.getUserByID(req.params.id);      

    if (await Logs.findOne({ where: { date: datetime() } })) {
        await Logs.update({ count: literal('count + 1') }, { where: { date: datetime() }} )
    } else {
        Logs.create({
            date: datetime(),
            count: 1
        }).then((logs: any) => console.log(logs.toJSON()));
    }

    if (response.success) {
        // log user to database
        if (await Lookup.findOne({ where: { userid: response.data.id } })) {
            await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: response.data.id }} )
        } else {
            Lookup.create({
                userid: response.data.id,
                total_search: 1,
                does_exist: true, // check if user is a bot
                is_bot: response.data.isBot,
            }).then((lookup: any) => console.log(lookup.toJSON()));
        }

        res.status(200).json(response);
    } else {
        if (await Lookup.findOne({ where: { userid: response.data.id } })) {
            await Lookup.update({ total_search: literal('total_search + 1') }, { where: { userid: response.data.id }} )
        } else {
            Lookup.create({
                userid: response.data.id,
                total_search: 1,
            }).then((lookup: any) => console.log(lookup.toJSON()));
        }

        res.status(400).json(response);
    }
});

router.get('/logs/today', async (_req, res) => {
    const controller = new LoggingController();
    const response = await controller.getTodayLogs();

    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

export = router;
