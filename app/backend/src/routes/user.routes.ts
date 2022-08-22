import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const userController = new UserController();

router.post(
  '/login',
  (req, res, next) => userController.checkLogin(req, res, next),
);
router.get('/login/validate', UserController.getUserRole);

export default router;
