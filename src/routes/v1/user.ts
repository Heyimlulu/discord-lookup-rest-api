import { Router } from 'express';
import { UserController }  from '../../controllers/v1/UserController';

const router = Router();

router.get('/user/lookup/:userId', async (req, res) => {
    const controller = new UserController();
    const response = await controller.getUserByID(req.params.userId);      

    if (response.status === 200) {
        res.status(200).json(response);
    } else {
        res.status(response.status).json(response);
    }
});

router.get('/user/decode/:userId', async (req, res) => {
    const controller = new UserController();
    const response = await controller.decodeSnowflake(req.params.userId);      

    if (response.status === 200) {
        res.status(200).json(response);
    } else {
        res.status(response.status).json(response);
    }
});

router.get('/user/calculate-snowflake-difference', async (req, res) => {   
    const controller = new UserController();        
    const userIds = req.query.ids || [];
    const response = await controller.calculateSnowflakeDifference(userIds.toString().split(','));      

    if (response.status === 200) {
        res.status(200).json(response);
    } else {
        res.status(response.status).json(response);
    }
});

export default router;
