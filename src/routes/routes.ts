import { Router } from 'express';
import UserController  from '../controllers/user';
import LoggingController from '../controllers/logs';

const router = Router();

router.get('/user/profile/:id?', UserController.getUserByID);
router.get('/user/random', UserController.getRandomUser);

router.get('/logs/today', LoggingController.getTodayLogs);
router.get('/logs', LoggingController.getAllLogs);
router.get('/logs/:year', LoggingController.getLogsByYear);
router.get('/logs/:year/:month', LoggingController.getLogsByYearAndMonth);

export = router;
