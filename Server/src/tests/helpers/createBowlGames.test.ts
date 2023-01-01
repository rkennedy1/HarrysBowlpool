import { createBowlGames, BowlGame, BowlTeam } from '../../routes/gameRoute';

let date = new Date();
let bowlGame: BowlGame[] = [
  {
    gameId: 401331164,
    startTime: date,
    homeTeam: 202176276,
    awayTeam: 202103645,
    bowlName: 'Bahamas'
  }
];
let bowlTeams: BowlTeam[] = [
  {
    teamId: 202176276,
    bowlId: 401331164,
    year: '2021',
    name: 'Toledo',
    isHome: true,
    line: '-10.0',
    record: '7-5',
    conference: 'Mid-American',
    firstQuarterScore: 0,
    secondQuarterScore: 17,
    thirdQuarterScore: 0,
    fourthQuarterScore: 7,
    score: 24
  },
  {
    teamId: 202103645,
    bowlId: 401331164,
    year: '2021',
    name: 'Middle Tennessee',
    isHome: false,
    line: '',
    record: '6-6',
    conference: 'Conference USA',
    firstQuarterScore: 7,
    secondQuarterScore: 7,
    thirdQuarterScore: 0,
    fourthQuarterScore: 17,
    score: 31
  }
];
let bowlGameResult: BowlGame[] = [
  {
    gameId: 401331164,
    startTime: date,
    homeTeam: {
      teamId: 202176276,
      bowlId: 401331164,
      year: '2021',
      name: 'Toledo',
      isHome: true,
      line: '-10.0',
      record: '7-5',
      conference: 'Mid-American',
      firstQuarterScore: 0,
      secondQuarterScore: 17,
      thirdQuarterScore: 0,
      fourthQuarterScore: 7,
      score: 24
    },
    awayTeam: {
      teamId: 202103645,
      bowlId: 401331164,
      year: '2021',
      name: 'Middle Tennessee',
      isHome: false,
      line: '',
      record: '6-6',
      conference: 'Conference USA',
      firstQuarterScore: 7,
      secondQuarterScore: 7,
      thirdQuarterScore: 0,
      fourthQuarterScore: 17,
      score: 31
    },
    bowlName: 'Bahamas'
  }
];

test('Teams match the bowl game should be returned as object merged with bowlGame', () => {
  expect(createBowlGames(bowlGame, bowlTeams) == bowlGameResult);
});

test('No teams match the bowl game should return empty set', () => {
  expect(createBowlGames(bowlGame, []) == null);
});
