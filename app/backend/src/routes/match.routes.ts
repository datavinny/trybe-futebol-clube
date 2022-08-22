import { Router } from 'express';
import isTokenValid from '../middleware/token.middleware';
import MatchesController from '../controllers/match.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', (req, res, next) => matchesController.getAll(req, res, next));

router.post(
  '/matches',
  isTokenValid,
  (req, res, next) => matchesController.createMatch(req, res, next),
);

export default router;
