import { Router } from 'express';
import DiscordUserController  from '../../controllers/v1/DiscordUserController';
// import LogsController from '../../controllers/v1/LogsController';

const router = Router();

router.get('/user/:id', async (req, res) => {
    const controller = new DiscordUserController();
    const response = await controller.getUserByID(req.params.id);      

    if (response.status === 200) {
        res.status(200).json(response);
    } else {
        res.status(response.status).json(response);
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
