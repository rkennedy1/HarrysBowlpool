import express, { Request, Response } from 'express';
import { connection } from '../helpers/db';

export interface Version {
  currentVersion: Number;
}

export function getCurrentVersion(year: String) {
  let query = `SELECT currentVersion FROM version    
                WHERE year = ${year}`;
  let values = [year]
  var currentVersion = 0
  connection.query(query, function (err: Error, returnVersion: number) {
    if err {
      
    }
    currentVersion = returnVersion
  })
  console.log("current version from util: " + currentVersion)
  return currentVersion

}
