import { Router } from 'express';
import { getUserById } from '../controllers/user';
import { getTodayStats } from '../controllers/logs';
//import { getAuthentificatedUser, authDiscordRedirect } from '../controllers/auth';

const router = Router();

router.get('/user/profile/:id?', getUserById);
router.get('/logs/today', getTodayStats);
//router.get('/auth/user', getAuthentificatedUser);
//router.get('/auth/redirect', authDiscordRedirect)

export = router;
