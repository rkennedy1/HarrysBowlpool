import axios from 'axios';
import { BowlGame, Player } from './DataModels';

export class bowlpoolRepo {
  url =
    process.env.REACT_APP_USE_DEV === 'true'
      ? process.env.REACT_APP_API_URL_DEV
      : process.env.REACT_APP_API_URL;

  getGameData(year: number) {
    let localStorageGameData = localStorage.getItem(
      'gameData' + year.toString()
    );
    return new Promise<BowlGame[]>((resolve, reject) => {
      if (localStorageGameData) {
        console.log(JSON.parse(localStorageGameData));
        resolve(JSON.parse(localStorageGameData));
      } else {
        axios
          .get(`${this.url}/gameData/${year}`)
          .then((resp) => {
            let data = resp.data;
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
            resolve(sortedData);
          })
          .catch((resp) => alert(resp));
      }
    });
  }

  getPlayerData(year: number) {
    let localStoragePlayerData = localStorage.getItem(
      'playerData' + year.toString()
    );
    return new Promise<Player[]>((resolve, reject) => {
      if (localStoragePlayerData) {
        console.log(JSON.parse(localStoragePlayerData));
        resolve(JSON.parse(localStoragePlayerData));
      } else {
        axios
          .get(`${this.url}/playerData/${year}`)
          .then((resp) => {
            let data = resp.data;
            let sortedPlayers = data.sort(
              (a: Player, b: Player) => b.points - a.points
            );
            localStorage.setItem(
              'playerData' + year.toString(),
              JSON.stringify(sortedPlayers)
            );
            resolve(sortedPlayers);
          })
          .catch((resp) => alert(resp));
      }
    });
  }
}
