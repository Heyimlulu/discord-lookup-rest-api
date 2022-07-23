import { Router } from 'express';
// import AccountController from '../controllers/account';
import DiscordLookupController  from '../controllers/DiscordLookup';
import LoggingController from '../controllers/logging';
// import { verifyToken } from '../oauth';

const router = Router();

//router.post('/login', AccountController.authentification);
//router.post('/register', AccountController.registration);

router.get('/user/profile/:id?', async (req, res) => {
    const controller = new DiscordLookupController();
    const response = await controller.getUserByID(req);
    
    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

router.get('/logs/today', async (req, res) => {
    const controller = new LoggingController();
    const response = await controller.getTodayLogs();

    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

export = router;
