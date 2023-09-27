import express, { Request, Response } from 'express';
import { connection } from '../helpers/db';


export function getCurrentVersion(year: String): number {
  let query = `SELECT currentVersion FROM version    
                WHERE year = ${year}`;
  let values = [year]
  var currentVersion = 0
  connection.query(query, function (err: Error, returnVersion: number) {
    if (err) throw console.error(err);
     Promise.resolve(returnVersion)
    console.log("current version from util: " + currentVersion)
  })
}
