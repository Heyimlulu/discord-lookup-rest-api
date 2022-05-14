import { Router } from 'express';
// import AccountController from '../controllers/account';
import DiscordLookupController  from '../controllers/DiscordLookup';
import LoggingController from '../controllers/logging';
// import { verifyToken } from '../oauth';

const router = Router();

//router.post('/login', AccountController.authentification);
//router.post('/register', AccountController.registration);

router.get('/user/profile/:id?', DiscordLookupController.getUserByID);
router.get('/user/random', DiscordLookupController.getRandomUser);

router.get('/logs/today', LoggingController.getTodayLogs);
// router.get('/logs', verifyToken, LoggingController.getAllLogs);
// router.get('/logs/:year', verifyToken, LoggingController.getLogsByYear);
// router.get('/logs/:year/:month', verifyToken, LoggingController.getLogsByYearAndMonth);

export = router;
