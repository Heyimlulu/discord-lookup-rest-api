import { Router } from 'express';

import * as v1 from './v1';

const router = Router();

router.use('/v1', v1.userRoute);

export default router;