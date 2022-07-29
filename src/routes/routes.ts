import { Router } from 'express';
import DiscordLookupController  from '../controllers/DiscordLookup';
import LoggingController from '../controllers/logging';
// import AccountController from '../controllers/account';
// import { verifyToken } from '../oauth';

const router = Router();

//router.post('/login', AccountController.authentification);
//router.post('/register', AccountController.registration);

router.get('/user/:id', async (req, res) => {
    const controller = new DiscordLookupController();
    const response = await controller.getUserByID(req.params.id);      

    if (response.success) {
        res.status(200).json(response);
    } else {
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
