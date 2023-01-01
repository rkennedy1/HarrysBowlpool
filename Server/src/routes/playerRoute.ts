import express, { Request, Response } from 'express';
import { connection } from '../helpers/db';
import { getTeamIdRange } from '../helpers/teamId';
import _ from 'lodash';

export interface Pick {
  pickId: number;
  playerId: number;
  gameId: number;
  isHome: boolean;
}

export interface Player {
  playerId: number;
  name: string;
  points: number;
  year: string;
  picks: Pick[];
}

export function isPlayersPick(pick: Pick, player: Player) {
  return pick.playerId == player.playerId;
}

export function createPlayersPicks(players: Player[], picks: Pick[]) {
  return _.map(players, (player) => {
    return _.assign({}, player, {
      picks: picks.filter((pick: Pick) => isPlayersPick(pick, player))
    });
  }) as Player[];
}

export const playerRoute = express.Router();
playerRoute.get('/playerData/:year', (req: Request, res: Response) => {
  let playerIdRange = getTeamIdRange(req.params['year']);
  let query = `SELECT * FROM players WHERE playerId > ${playerIdRange.lowerBound} AND playerId < ${playerIdRange.upperBound}`;
  connection.query(query, function (err, players) {
    if (err) throw console.error(err);
    query = `SELECT * FROM playerPicks WHERE playerId > ${playerIdRange.lowerBound} AND playerId < ${playerIdRange.upperBound}`;
    connection.query(query, function (err, picks) {
      if (err) throw console.error(err);
      res.send(
        createPlayersPicks(
          JSON.parse(JSON.stringify(players)),
          JSON.parse(JSON.stringify(picks))
        )
      );
    });
  });
});
