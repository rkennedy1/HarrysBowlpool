import players from './playerData.json';
import bowlGames from './gameData.json';

export const mockedPaths = [
  {
    path: '/gameData/2023?version=5',
    data: bowlGames
  },
  {
    path: '/playerData/2023?version=5',
    data: players
  }
];
