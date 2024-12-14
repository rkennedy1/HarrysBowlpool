export type BowlGame = {
  gameId: number;
  bowlName: string;
  startTime: Date;
  homeTeam: BowlTeam;
  awayTeam: BowlTeam;
};

export type BowlTeam = {
  teamId: number;
  name: string;
  line: number;
  score: number;
  record: string;
};

export type Player = {
  playerId: number;
  name: string;
  points: number;
  year: number;
  picks: Pick[];
  version: number;
};

export type Pick = {
  year: number;
  player: string;
  gameId: number;
  teamId: number;
  version: number;
};
