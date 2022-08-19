import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middleware/login.middleware';

const router = Router();

const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();

router.post(
  '/login',
  loginMiddleware.validateBody,
  (req, res, next) => loginController.checkLogin(req, res, next),
);
router.get('/login/validate', LoginController.validate);

export default router;
