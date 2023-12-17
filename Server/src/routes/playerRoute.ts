import express, { Request, Response } from 'express';
import { connection } from '../helpers/db';
import { getTeamIdRange } from '../helpers/teamId';
import _, { isEmpty } from 'lodash';
import { getCurrentVersion } from '../helpers/versionUtil';

export interface Pick {
  year: number;
  pickId: number;
  player: string;
  gameId: number;
  teamId: string;
}

export interface Player {
  playerId: number;
  name: string;
  points: number;
  year: string;
  picks: Pick[];
}

export function isPlayersPick(pick: Pick, player: Player) {
  return pick.player == player.name;
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
    let query = `SELECT * FROM players WHERE year = ${year}`;
    connection.query(query, function (err: Error, players: Player[]) {
      if (err) throw console.error(err);
      query = `SELECT * FROM playerPicks WHERE year = ${year}`;
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
    var version = -1;
    if (!isEmpty(req.query.version)) {
      version = parseInt(req.query.version as string);
      version = version == 0 ? -1 : version;
    }
    let year = req.params['year'];
    let currentVersion = await getCurrentVersion(year);
    let playerIdRange = getTeamIdRange(year);
    let query = `SELECT * FROM players WHERE year = ${year} AND version > ${version}`;
    connection.query(query, function (err: Error, players: Player[]) {
      if (err) throw console.error(err);
      query = `SELECT * FROM playerPicks WHERE year = ${year} AND version > ${version}`;
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
