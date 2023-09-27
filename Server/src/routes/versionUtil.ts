import express, { Request, Response } from 'express';
import { connection } from '../helpers/db';

export async function getCurrentVersion(year: String): Promise<number> {
  let query = `SELECT currentVersion FROM version    
                WHERE year = ${year}`;
  let values = [year];
  var currentVersion = 0;
  return new Promise<number>((resolve, reject) => {
    connection.query(query, function (err: Error, returnVersion: number) {
      if (err) reject(err);
      console.log('current version from util: ' + currentVersion);
      resolve(currentVersion);
    });
  });
}
