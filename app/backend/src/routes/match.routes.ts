import { Router } from 'express';
import authToken from '../middleware/token.middleware';
import MatchesController from '../controllers/match.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', (req, res, next) => matchesController.getAll(req, res, next));

router.post(
  '/matches',
  authToken,
  (req, res, next) => matchesController.createMatch(req, res, next),
);

export default router;
