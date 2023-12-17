import { Player } from '../../util/DataModels';
import React, { useState, useEffect } from 'react';

interface BowlpoolTableFooterProps {
  hideBowlData: boolean;
  playerData: Player[];
  open: boolean;
}

export const BowlpoolTableFooter: React.FC<BowlpoolTableFooterProps> = (
  props
) => {
  const [currentPlayer, setCurrentPlayer] = useState<string>(() => {
    const saved = JSON.parse(localStorage.getItem('playerName') || '{}');
    return saved;
  });

  useEffect(() => {
    setCurrentPlayer(JSON.parse(localStorage.getItem('playerName') || '{}'));
  }, [props.open]);

  return (
    <tfoot className="position-sticky">
      <tr className="footer">
        <th className="footer">Total</th>
        {!props.hideBowlData && <th className="footer"></th>}
        {!props.hideBowlData && <th className="footer"></th>}
        <th className="footer"></th>
        {props.playerData !== undefined &&
          props.playerData.map((p, i) => (
            <th
              key={i}
              id="footCols"
              className={
                currentPlayer === p.name
                  ? 'bg-warning footer'
                  : 'bg-light footer'
              }
            >
              {p.points}
            </th>
          ))}
      </tr>
    </tfoot>
  );
};
