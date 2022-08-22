import { Router } from 'express';
import MatchesController from '../controllers/match.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', (req, res, next) => matchesController.getAll(req, res, next));

export default router;
