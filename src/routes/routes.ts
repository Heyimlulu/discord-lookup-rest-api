import { Router } from 'express';
import AuthentificationController from '../controllers/authentification';
import DiscordApiController  from '../controllers/discordApi';
import LoggingController from '../controllers/logging';
import { verifyToken } from '../auth/auth';

const router = Router();

router.post('/login', AuthentificationController.login);

router.get('/user/profile/:id?', DiscordApiController.getUserByID);
router.get('/user/random', DiscordApiController.getRandomUser);

router.get('/logs/today', verifyToken, LoggingController.getTodayLogs);
router.get('/logs', verifyToken, LoggingController.getAllLogs);
router.get('/logs/:year', verifyToken, LoggingController.getLogsByYear);
router.get('/logs/:year/:month', verifyToken, LoggingController.getLogsByYearAndMonth);

export = router;
