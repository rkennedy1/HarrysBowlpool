export type BowlGame = {
  gameId: string;
  bowlName: string;
  startTime: Date;
  homeTeam: BowlTeam;
  awayTeam: BowlTeam;
};

export type BowlTeam = {
  name: string;
  line: string;
  score: number;
  record: string;
};

export type Player = {
  playerId: number;
  name: string;
  points: number;
  year: number;
  picks: Pick[];
};

export type Pick = {
  gameId: string;
  isHome: boolean;
};
