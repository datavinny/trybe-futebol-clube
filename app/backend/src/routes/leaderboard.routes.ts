import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get(
  '/leaderboard/home',
  (req, res, next) => leaderboardController.getHomeLeaderboard(req, res, next),
);

export default router;
