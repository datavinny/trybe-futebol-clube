import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

const teamController = new TeamController();

router.get('/teams', (req, res, next) => teamController.getAll(req, res, next));
router.get('/teams/:id', (req, res, next) => teamController.getById(req, res, next));

export default router;
