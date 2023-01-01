import { createPlayersPicks, Pick, Player } from '../../routes/playerRoute';

let picks: Pick[] = [
  {
    pickId: 2021133529751,
    playerId: 202135697,
    gameId: 401331231,
    isHome: true
  },
  {
    pickId: 2021967618644,
    playerId: 202118056,
    gameId: 401331221,
    isHome: false
  }
];
let players: Player[] = [
  { playerId: 202188647, name: 'JMK', points: 12, year: '2021', picks: [] },
  { playerId: 202135697, name: 'MSK', points: 21, year: '2021', picks: [] }
];

let playerPickResult: Player[] = [
  {
    playerId: 202188647,
    name: 'JMK',
    points: 12,
    year: '2021',
    picks: [
      {
        pickId: 2021133529751,
        playerId: 202135697,
        gameId: 401331231,
        isHome: true
      }
    ]
  },
  {
    playerId: 202135697,
    name: 'MSK',
    points: 21,
    year: '2021',
    picks: [
      {
        pickId: 2021967618644,
        playerId: 202118056,
        gameId: 401331221,
        isHome: false
      }
    ]
  }
];
test('should return a list with the picks inserted in the players objects', () => {
  expect(createPlayersPicks(players, picks) == playerPickResult);
});

test("should return null set as pick playerId dpes mpt match player's playerId", () => {
  expect(createPlayersPicks([players[0]], [picks[0]]) == null);
});
