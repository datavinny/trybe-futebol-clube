import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get(
  '/leaderboard/home',
  (req, res, next) => leaderboardController.getHomeLeaderboard(req, res, next),
);

router.get(
  '/leaderboard/away',
  (req, res, next) => leaderboardController.getAwayLeaderboard(req, res, next),
);

router.get(
  '/leaderboard',
  (req, res, next) => leaderboardController.getLeaderboard(req, res, next),
);

export default router;
