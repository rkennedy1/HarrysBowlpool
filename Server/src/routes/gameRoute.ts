import express, { Request, Response } from 'express';
import { connection } from '../helpers/db';
import { getTeamIdRange } from '../helpers/teamId';
import _, { get, isEmpty } from 'lodash';
import { getCurrentVersion } from './versionUtil';

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
gameRoute.get('/gameData/:year', (req: Request, res: Response) => {
  var year = req.params['year']
  var version = 0
  if (!isEmpty(req.query.version)) {
    version = parseInt(req.query.version as string)
  }
  let currentVersion = getCurrentVersion(year)
   console.log(currentVersion)

  if (version < currentVersion) {
    let teamIdRange = getTeamIdRange(year);
    let query = `SELECT * FROM bowlGames 
                      WHERE homeTeam > ${teamIdRange.lowerBound} 
                      AND homeTeam < ${teamIdRange.upperBound}`;
    let values = []
    connection.query(query, function (err: Error, results: BowlGame[]) {
      if (err) throw console.error(err);
      let bowlGames = JSON.parse(JSON.stringify(results));
      query = `SELECT * FROM bowlTeams 
                  WHERE teamId > ${teamIdRange.lowerBound} 
                  AND teamId < ${teamIdRange.upperBound}`;
      connection.query(query, function (err: Error, result: BowlTeam[]) {
        let bowlTeams = JSON.parse(JSON.stringify(result));
        let mergedResults = createBowlGames(bowlGames, bowlTeams);
        res.send({'version': currentVersion, 'bowlData': mergedResults});
      });
    });}
    else
    {
      res.send({'version': currentVersion});
    }
  });

export const gameRouteDelta = express.Router();
gameRoute.get('/gameData/delta/:year', (req: Request, res: Response) => {
  var version = 0
  if (!isEmpty(req.query.version)) {
    version = parseInt(req.query.version as string)
  }
  let teamIdRange = getTeamIdRange(req.params['year']);
  let query = `SELECT * FROM bowlGames 
                    WHERE homeTeam > ${teamIdRange.lowerBound} 
                    AND homeTeam < ${teamIdRange.upperBound}
                    AND version > ${version}`;
  let values = []
  connection.query(query, function (err: Error, results: BowlGame[]) {
    if (err) throw console.error(err);
    let bowlGames = JSON.parse(JSON.stringify(results));
    query = `SELECT * FROM bowlTeams 
                WHERE teamId > ${teamIdRange.lowerBound} 
                AND teamId < ${teamIdRange.upperBound}
                AND version > ${version}`;
    connection.query(query, function (err: Error, result: BowlTeam[]) {
      let bowlTeams = JSON.parse(JSON.stringify(result));
      let mergedResults = createBowlGames(bowlGames, bowlTeams);
      res.send(mergedResults);
    });
  });
});