import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middleware/login.middleware';

const router = Router();

const loginMiddleware = new LoginMiddleware();

router.post('/login', loginMiddleware.validateBody, LoginController.checkLogin);
router.get('/login/validate', LoginController.validate);

export default router;
