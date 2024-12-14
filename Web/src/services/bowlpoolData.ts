import { BowlGame, Player } from '@/data/DataModels';
import { fetch } from '@/http';

export async function fetchBowlpoolData(): Promise<BowlGame[]> {
  const year = 2023; // or make this parameter dynamic
  const localGameData = localStorage.getItem(`gameData${year}`);
  const localGameVersion = localStorage.getItem('gameVersion') ?? '0';

  try {
    const response = await fetch<{ version: string; bowlData: BowlGame[] }>(
      `/gameData/${year}`,
      {
        queryParms: localGameVersion ? { version: localGameVersion } : undefined
      }
    );

    if (response.version > localGameVersion) {
      const sortedData = response.bowlData.sort(
        (a, b) =>
          new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
      );
      localStorage.setItem(`gameData${year}`, JSON.stringify(sortedData));
      localStorage.setItem('gameVersion', response.version);
      return sortedData;
    } else if (localGameData) {
      return JSON.parse(localGameData);
    }
    return response.bowlData;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching bowl data:', errorMessage);
    // Could integrate with an error reporting service
    throw new Error(`Failed to fetch bowl data: ${errorMessage}`);
  }
}

export async function fetchPlayers(): Promise<Player[]> {
  const year = 2023; // or make this parameter dynamic
  const localPlayerData = localStorage.getItem(`playerData${year}`);
  const localPlayerVersion = localStorage.getItem('playerVersion') ?? '0';

  try {
    const response = await fetch<{ version: string; players: Player[] }>(
      `/playerData/${year}`,
      {
        queryParms: localPlayerVersion
          ? { version: localPlayerVersion }
          : undefined
      }
    );

    if (response.version > localPlayerVersion) {
      const sortedPlayers = response.players.sort(
        (a, b) => b.points - a.points
      );
      localStorage.setItem(`playerData${year}`, JSON.stringify(sortedPlayers));
      localStorage.setItem('playerVersion', response.version);
      return sortedPlayers;
    } else if (localPlayerData) {
      return JSON.parse(localPlayerData);
    }
    return response.players;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching player data:', errorMessage);
    // Could integrate with an error reporting service
    throw new Error(`Failed to fetch player data: ${errorMessage}`);
  }
}
