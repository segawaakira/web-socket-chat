import { Router } from 'express';
import { chatsController } from '../controllers';
import { verifyJwt } from '../middlewares';

const router = Router();

router.get(
  '/', 
  verifyJwt,
  chatsController.getAll,
);

router.post(
  '/:username',
  verifyJwt,
  chatsController.create,
);

export default router;