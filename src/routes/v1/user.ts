import { Router } from 'express';
import { LookupController }  from '../../controllers/v1/LookupController';

const router = Router();

router.get('/user/lookup/:id', async (req, res) => {
    const controller = new LookupController();
    const response = await controller.getUserByID(req.params.id);      

    if (response.status === 200) {
        res.status(200).json(response);
    } else {
        res.status(response.status).json(response);
    }
});

router.get('/user/decode/:id', async (req, res) => {
    const controller = new LookupController();
    const response = await controller.decodeSnowflake(req.params.id);      

    if (response.status === 200) {
        res.status(200).json(response);
    } else {
        res.status(response.status).json(response);
    }
});

router.get('/user/calculate-snowflake-difference', async (req, res) => {   
    const controller = new LookupController();        
    const ids = req.query.ids || [];
    const response = await controller.calculateSnowflakeDifference(ids.toString().split(','));      

    if (response.status === 200) {
        res.status(200).json(response);
    } else {
        res.status(response.status).json(response);
    }
});

export default router;
