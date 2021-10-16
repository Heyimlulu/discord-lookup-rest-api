import express from 'express';
import controller from '../controllers/user';
const router = express.Router();

router.get('/users/:id', controller.getUserById);

export = router;
