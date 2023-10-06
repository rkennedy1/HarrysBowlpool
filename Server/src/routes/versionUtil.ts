import express, { Request, Response } from 'express';
import { connection } from '../helpers/db';

interface version {
  currentVersion: number;
}

export async function getCurrentVersion(year: String): Promise<number> {
  let query = `SELECT currentVersion FROM version    
                WHERE year = ${year}`;

  return new Promise<number>((resolve, reject) => {
    connection.query(query, function (err: Error, returnVersion: version[]) {
      if (err) reject(err);
      resolve(returnVersion[0].currentVersion);
    });
  });
}
