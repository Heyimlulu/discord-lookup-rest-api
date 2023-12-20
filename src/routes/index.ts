import { Router } from 'express';

import * as v1 from './v1';

const router = Router();

router.use('/v1', v1.userRoute);
router.use('/v1', v1.serverRoute);

export default router;