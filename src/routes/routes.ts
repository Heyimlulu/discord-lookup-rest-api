import { Router } from 'express';
import { getUserById } from '../controllers/user';
//import { getAuthentificatedUser, authDiscordRedirect } from '../controllers/auth';

const router = Router();

router.get('/user/profile/:id?', getUserById);
//router.get('/auth/user', getAuthentificatedUser);
//router.get('/auth/redirect', authDiscordRedirect)

export = router;
