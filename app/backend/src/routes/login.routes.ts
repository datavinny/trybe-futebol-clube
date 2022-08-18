import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middleware/login.middleware';

const router = Router();

const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();

router.post('/login', loginMiddleware.create, loginController.create);

export default router;
