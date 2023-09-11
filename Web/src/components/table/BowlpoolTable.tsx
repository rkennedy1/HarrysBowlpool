import React, { useState, useEffect } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { bowlpoolRepo } from '../../util/bowlpoolRepo';
import '../../styles/bowlpool.css';
import { BowlpoolTableHeader } from './BowlpoolTableHeader';
import { BowlpoolTableFooter } from './BowlpoolTableFooter';
import { BowlpoolTableBody } from './BowlpoolTableBody';
import { BowlGame, Player } from '../../util/DataModels';
import { GameCard } from '../cards/GameCard';
import { Grid } from '@mui/material';

const bpr = new bowlpoolRepo();

interface bowlpoolTableProps {
  year: number;
  hideBowlData: boolean;
}

export const BowlpoolTable: React.FC<bowlpoolTableProps> = (props) => {
  const [gameData, setGameData] = useState<BowlGame[]>([]);
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bpr.getGameData(props.year).then((data: BowlGame[]) => setGameData(data));
    bpr.getPlayerData(props.year).then((data: Player[]) => setPlayerData(data));
    setLoading(true);
  }, [props.year]);

  return (
    // <table className="table">
    //   <BowlpoolTableHeader
    //     hideBowlData={props.hideBowlData}
    //     playerData={playerData}
    //   />
    //   <BowlpoolTableBody
    //     hideBowlData={props.hideBowlData}
    //     playerData={playerData}
    //     gameData={gameData}
    //   />
    //   <BowlpoolTableFooter
    //     hideBowlData={props.hideBowlData}
    //     playerData={playerData}
    //   />
    // </table>
    <Grid container spacing={2}>
      {loading &&
        gameData.map((game, i) => {
          return (
            <Grid item xs={12} lg={4} md={6}>
              <GameCard key={i} game={game} players={playerData} />
            </Grid>
          );
        })}
    </Grid>
  );
};
