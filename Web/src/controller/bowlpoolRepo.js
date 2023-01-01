import axios from 'axios';

export class bowlpoolRepo {
  url = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL_DEV;

  getGameData(year) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.url}/gameData/${year}`, this.config)
        .then((resp) => {
          let data = resp.data;
          let sortedData = data.sort((a, b) => {
            return new Date(a.startTime) - new Date(b.startTime);
          });
          resolve(sortedData);
        })
        .catch((resp) => alert(resp));
    });
  }

  getPlayerData(year) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.url}/playerData/${year}`, this.config)
        .then((resp) => {
          let data = resp.data;
          let sortedPlayers = data.sort((a, b) => b.points - a.points);
          data.players = sortedPlayers;
          resolve(data);
        })
        .catch((resp) => alert(resp));
    });
  }
}
