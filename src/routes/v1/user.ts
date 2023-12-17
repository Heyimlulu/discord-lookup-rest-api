import { Router } from 'express';
import DiscordUserController  from '../../controllers/v1/DiscordUserController';

const router = Router();

/**
 * @swagger
 * /user/{id}:
 *  get:
 *    summary: Get a user by ID
 *    description: Get a user by ID
 */
router.get('/user/:id', async (req, res) => {
    const controller = new DiscordUserController();
    const response = await controller.getUserByID(req.params.id);      

    if (response.status === 200) {
        res.status(200).json(response);
    } else {
        res.status(response.status).json(response);
    }
});

export default router;
