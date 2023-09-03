import React from 'react';
import { BowlpoolTableRow } from './BowlpoolTableRow';
import { BowlGame, Player } from '../../util/DataModels';

interface BowlpoolTableBodyProps {
  gameData: BowlGame[];
  playerData: Player[];
  hideBowlData: boolean;
}

export const BowlpoolTableBody: React.FC<BowlpoolTableBodyProps> = (props) => {
  return (
    <tbody>
      {props.gameData !== undefined &&
        props.gameData.map((g, i) => (
          <BowlpoolTableRow
            key={i}
            gameData={g}
            playerData={props.playerData}
            hideBowlData={props.hideBowlData}
          />
        ))}
    </tbody>
  );
};
