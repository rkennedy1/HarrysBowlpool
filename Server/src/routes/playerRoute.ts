import express, { Request, Response } from 'express';
import { connection } from '../helpers/db';
import { getTeamIdRange } from '../helpers/teamId';
import _, { isEmpty } from 'lodash';
import { getCurrentVersion } from './versionUtil';

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
playerRoute.get('/playerData/:year', async (req: Request, res: Response) => {
  var year = req.params['year'];
  var version = 0;
  if (!isEmpty(req.query.version)) {
    version = parseInt(req.query.version as string);
  }
  let currentVersion = await getCurrentVersion(year);
  if (version < currentVersion) {
    let playerIdRange = getTeamIdRange(year);
    let query = `SELECT * FROM players WHERE playerId > ${playerIdRange.lowerBound} AND playerId < ${playerIdRange.upperBound}`;
    connection.query(query, function (err: Error, players: Player[]) {
      if (err) throw console.error(err);
      query = `SELECT * FROM playerPicks WHERE playerId > ${playerIdRange.lowerBound} AND playerId < ${playerIdRange.upperBound}`;
      connection.query(query, function (err: Error, picks: Pick[]) {
        if (err) throw console.error(err);
        let mergedResults = createPlayersPicks(
          JSON.parse(JSON.stringify(players)),
          JSON.parse(JSON.stringify(picks))
        );
        res.send({ version: currentVersion, players: mergedResults });
      });
    });
  } else {
    res.send({ version: currentVersion, players: [] });
  }
});

playerRoute.get(
  '/playerData/delta/:year',
  async (req: Request, res: Response) => {
    var version = 0;
    if (!isEmpty(req.query.version)) {
      version = parseInt(req.query.version as string);
    }
    let year = req.params['year'];
    let currentVersion = await getCurrentVersion(year);
    let playerIdRange = getTeamIdRange(year);
    let query = `SELECT * FROM players WHERE playerId > ${playerIdRange.lowerBound} AND playerId < ${playerIdRange.upperBound} AND version > ${version} OR version = 0`;
    connection.query(query, function (err: Error, players: Player[]) {
      if (err) throw console.error(err);
      query = `SELECT * FROM playerPicks WHERE playerId > ${playerIdRange.lowerBound} AND playerId < ${playerIdRange.upperBound} AND version > ${version} OR version = 0`;
      connection.query(query, function (err: Error, picks: Pick[]) {
        if (err) throw console.error(err);
        let mergedResults = createPlayersPicks(
          JSON.parse(JSON.stringify(players)),
          JSON.parse(JSON.stringify(picks))
        );
        res.send({ version: currentVersion, players: mergedResults });
      });
    });
  }
);
