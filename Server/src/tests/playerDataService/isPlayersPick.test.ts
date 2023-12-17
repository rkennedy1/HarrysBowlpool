import { isPlayersPick } from '../../routes/playerRoute';

test("should return false as pick playerId does not match player's playerId", () => {
  expect(
    isPlayersPick(
      {
        pickId: 2021996252547,
        year: 2023,
        gameId: 401331168,
        teamId: 122,
        player: 'RSK'
      },
      { playerId: 202188647, name: 'JMK', points: 12, year: '2021', picks: [] }
    ) == false
  );
});

test("should return true as pick playerId matches player's playerId", () => {
  expect(
    isPlayersPick(
      {
        pickId: 2021960842164,
        year: 2023,
        gameId: 401331229,
        teamId: 132,
        player: 'JMK'
      },
      { playerId: 202188647, name: 'JMK', points: 12, year: '2021', picks: [] }
    )
  );
});
