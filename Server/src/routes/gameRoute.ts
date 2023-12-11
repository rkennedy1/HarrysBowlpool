import express, { Request, Response } from 'express';
import { connection } from '../helpers/db';
import { getTeamIdRange } from '../helpers/teamId';
import _, { isEmpty } from 'lodash';
import { getCurrentVersion } from '../helpers/versionUtil';

export interface BowlGame {
  gameId: number;
  startTime: Date;
  homeTeam: number | BowlTeam;
  awayTeam: number | BowlTeam;
  bowlName: string;
}

export interface BowlTeam {
  teamId: number;
  bowlId: number;
  year: string;
  name: string;
  isHome: boolean;
  line: string;
  record: string;
  conference: string;
  firstQuarterScore: number;
  secondQuarterScore: number;
  thirdQuarterScore: number;
  fourthQuarterScore: number;
  score: number;
}

export function createBowlGames(bowlGames: BowlGame[], bowlTeams: BowlTeam[]) {
  return _.map(bowlGames, function (o: BowlGame) {
    return _.assign({}, o, {
      // we are switching the id for the associated object -home or away
      awayTeam: _.find(bowlTeams, { teamId: o.awayTeam }),
      homeTeam: _.find(bowlTeams, { teamId: o.homeTeam })
    });
  }) as BowlGame[];
}

export const gameRoute = express.Router();
gameRoute.get('/gameData/:year', async (req: Request, res: Response) => {
  var year = req.params['year'];
  var version = 0;
  if (!isEmpty(req.query.version)) {
    version = parseInt(req.query.version as string);
  }
  let currentVersion = await getCurrentVersion(year);

  if (version < currentVersion || version == 0) {
    let teamIdRange = getTeamIdRange(year);
    let query = `SELECT * FROM bowlGames WHERE year = ${year}`;
    let values = [];
    connection.query(query, function (err: Error, results: BowlGame[]) {
      if (err) throw console.error(err);
      let bowlGames = JSON.parse(JSON.stringify(results));
      query = `SELECT * FROM bowlTeams WHERE year = ${year}`;
      connection.query(query, function (err: Error, result: BowlTeam[]) {
        let bowlTeams = JSON.parse(JSON.stringify(result));
        let mergedResults = createBowlGames(bowlGames, bowlTeams);
        res.send({ version: currentVersion, bowlData: mergedResults });
      });
    });
  } else {
    res.send({ version: currentVersion, bowlData: [] });
  }
});

export const gameRouteDelta = express.Router();
gameRoute.get('/gameData/delta/:year', async (req: Request, res: Response) => {
  var version = -1;
  if (!isEmpty(req.query.version)) {
    version = parseInt(req.query.version as string);
    version = version == 0 ? -1 : version;
  }
  let year = req.params['year'];
  let currentVersion = await getCurrentVersion(year);

  let teamIdRange = getTeamIdRange(year);
  let query = `SELECT * FROM bowlGames WHERE year = ${year}
                    AND version > ${version}`;
  let values = [];
  connection.query(query, function (err: Error, results: BowlGame[]) {
    if (err) throw console.error(err);
    let bowlGames = JSON.parse(JSON.stringify(results));
    query = `SELECT * FROM bowlTeams WHERE year = ${year}
                AND version > ${version}`;
    connection.query(query, function (err: Error, result: BowlTeam[]) {
      let bowlTeams = JSON.parse(JSON.stringify(result));
      let mergedResults = createBowlGames(bowlGames, bowlTeams);
      res.send({ version: currentVersion, bowlData: mergedResults });
    });
  });
});
