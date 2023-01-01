import React, { useState, useEffect } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { bowlpoolRepo } from '../controller/bowlpoolRepo';
import '../styles/bowlpool.css';
import { BowlpoolTableHeader } from './BowlpoolTableHeader';
import { BowlpoolTableFooter } from './BowlpoolTableFooter';
import { BowlpoolTableBody } from './BowlpoolTableBody';

const bpr = new bowlpoolRepo();

export function BowlpoolTable(props) {
  const [gameData, setGameData] = useState([]);
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    bpr.getGameData(props.year).then((data) => setGameData(data));
    bpr.getPlayerData(props.year).then((data) => setPlayerData(data));
  }, [props.year]);

  return (
    <table className="table">
      <BowlpoolTableHeader
        hideBowlData={props.hideBowlData}
        playerData={playerData}
      />
      <BowlpoolTableBody
        hideBowlData={props.hideBowlData}
        playerData={playerData}
        gameData={gameData}
      />
      <BowlpoolTableFooter
        hideBowlData={props.hideBowlData}
        playerData={playerData}
      />
    </table>
  );
}
