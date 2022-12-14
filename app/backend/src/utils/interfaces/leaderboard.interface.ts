interface ILeaderboard {
  name?: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
  teamHome?: { teamName:string },
  teamAway?: { teamName:string },
}

export default ILeaderboard;
