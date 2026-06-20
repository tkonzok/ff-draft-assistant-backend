export class RankingPlayerDto {
  id: string;
  name: string;
  ovr: string;
  rank: string;
  tier: string;
}

export class BulkUpdateRankingDto {
  ranking: string;
  players: RankingPlayerDto[];
}
