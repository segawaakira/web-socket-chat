import { Router } from 'express';
import { messagesController } from '../controllers';
import { verifyJwt } from '../middlewares';
import { messagesMiddleware } from '../middlewares/index';

const router = Router();

router.get(
  '/:chatId',
  verifyJwt,
  messagesController.getAll,
)

router.post(
  '/:chatId',
  verifyJwt,
  messagesMiddleware,
  messagesController.create
)

export default router;