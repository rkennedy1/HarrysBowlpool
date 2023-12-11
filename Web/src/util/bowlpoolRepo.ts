import axios from 'axios';
import { BowlGame, Player } from './DataModels';

export class bowlpoolRepo {
  url =
    process.env.REACT_APP_USE_DEV === 'true'
      ? process.env.REACT_APP_API_URL_DEV
      : process.env.REACT_APP_API_URL;

  getGameData(year: number) {
    let localGameData = localStorage.getItem('gameData' + year.toString());
    let localGameVersion =
      localStorage.getItem('gameVersion' + year.toString()) ?? 0;
    let gameDataURL = localGameVersion
      ? `${this.url}/gameData/${year}?version=${localGameVersion}`
      : `${this.url}/gameData/${year}`;
    return new Promise<BowlGame[]>((resolve, reject) => {
      axios
        .get(gameDataURL)
        .then((resp) => {
          let version = resp.data.version;
          let data: BowlGame[];
          if (version > localGameVersion) {
            data = resp.data.bowlData;
            let sortedData = data.sort((a: BowlGame, b: BowlGame) => {
              return (
                new Date(a.startTime).valueOf() -
                new Date(b.startTime).valueOf()
              );
            });
            localStorage.setItem(
              'gameData' + year.toString(),
              JSON.stringify(sortedData)
            );
            localStorage.setItem('gameVersion' + year.toString(), version);
            resolve(sortedData);
          } else if (localGameData) {
            resolve(JSON.parse(localGameData));
          }
        })
        .catch((resp) => alert(resp));
    });
  }

  getPlayerData(year: number) {
    let localPlayerData = localStorage.getItem('playerData' + year.toString());
    let localPlayerVersion =
      localStorage.getItem('playerVersion' + year.toString()) ?? 0;
    let playerDataURL = localPlayerVersion
      ? `${this.url}/playerData/${year}?version=${localPlayerVersion}`
      : `${this.url}/playerData/${year}`;
    return new Promise<Player[]>((resolve, reject) => {
      axios
        .get(playerDataURL)
        .then((resp) => {
          let version = resp.data.version;
          let data: Player[];
          if (version > localPlayerVersion) {
            data = resp.data.players;
            let sortedPlayers = data.sort(
              (a: Player, b: Player) => b.points - a.points
            );
            localStorage.setItem(
              'playerData' + year.toString(),
              JSON.stringify(sortedPlayers)
            );
            localStorage.setItem('playerVersion' + year.toString(), version);
            resolve(sortedPlayers);
          } else if (localPlayerData) {
            resolve(JSON.parse(localPlayerData));
          }
        })
        .catch((resp) => alert(resp));
    });
  }
}
