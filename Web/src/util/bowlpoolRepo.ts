import axios from 'axios';
import { BowlGame, Player } from './DataModels';

export class bowlpoolRepo {
  url = process.env.REACT_APP_USE_DEV
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL;

  getGameData(year: number) {
    return new Promise<BowlGame[]>((resolve, reject) => {
      axios
        .get(`${this.url}/gameData/${year}`)
        .then((resp) => {
          let data = resp.data;
          let sortedData = data.sort((a: BowlGame, b: BowlGame) => {
            return (
              new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
            );
          });
          resolve(sortedData);
        })
        .catch((resp) => alert(resp));
    });
  }

  getPlayerData(year: number) {
    return new Promise<Player[]>((resolve, reject) => {
      axios
        .get(`${this.url}/playerData/${year}`)
        .then((resp) => {
          let data = resp.data;
          let sortedPlayers = data.sort(
            (a: Player, b: Player) => b.points - a.points
          );
          resolve(sortedPlayers);
        })
        .catch((resp) => alert(resp));
    });
  }
}
