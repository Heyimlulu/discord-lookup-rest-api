import { Router } from 'express';
import UserController  from '../controllers/DiscordLookup';
import LogsController from '../controllers/logging';

const router = Router();

router.get('/user/:id', async (req, res) => {
    const controller = new UserController();
    const response = await controller.getUserByID(req.params.id);      

    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

// router.get('/logs/today', async (_req, res) => {
//     const controller = new LogsController();
//     const response = await controller.getTodayLogs();

//     if (response.success) {
//         res.status(200).json(response);
//     } else {
//         res.status(400).json(response);
//     }
// });

export = router;
