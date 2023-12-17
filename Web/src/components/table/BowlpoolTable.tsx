import React, { useState, useEffect } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { bowlpoolRepo } from '../../util/bowlpoolRepo';
import '../../styles/bowlpool.css';
import { BowlpoolTableHeader } from './BowlpoolTableHeader';
import { BowlpoolTableFooter } from './BowlpoolTableFooter';
import { BowlpoolTableBody } from './BowlpoolTableBody';
import { BowlGame, Player } from '../../util/DataModels';

const bpr = new bowlpoolRepo();

interface bowlpoolTableProps {
  year: number;
  hideBowlData: boolean;
  open: boolean;
}

export const BowlpoolTable: React.FC<bowlpoolTableProps> = (props) => {
  const [gameData, setGameData] = useState<BowlGame[]>([]);
  const [playerData, setPlayerData] = useState<Player[]>([]);

  useEffect(() => {
    bpr.getGameData(props.year).then((data: BowlGame[]) => setGameData(data));
    bpr.getPlayerData(props.year).then((data: Player[]) => setPlayerData(data));
  }, [props.year]);

  return (
    <table className="table">
      <BowlpoolTableHeader
        hideBowlData={props.hideBowlData}
        playerData={playerData}
        open={props.open}
      />
      <BowlpoolTableBody
        hideBowlData={props.hideBowlData}
        playerData={playerData}
        gameData={gameData}
      />
      <BowlpoolTableFooter
        hideBowlData={props.hideBowlData}
        playerData={playerData}
        open={props.open}
      />
    </table>
  );
};
