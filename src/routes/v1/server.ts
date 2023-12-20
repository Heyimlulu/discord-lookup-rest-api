import { Router } from 'express';
import { ServerController }  from '../../controllers/v1/ServerController';

const router = Router();

router.get('/server/lookup/:serverId', async (req, res) => {
    const controller = new ServerController();
    const response = await controller.getServerByID(req.params.serverId);      

    if (response.status === 200) {
        res.status(200).json(response);
    } else {
        res.status(response.status).json(response);
    }
});

export default router;
