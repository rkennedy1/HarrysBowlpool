import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Player } from '../../util/DataModels';

interface BowlpoolTableHeaderProps {
  playerData: Player[];
  hideBowlData: boolean;
  open: boolean;
}

export const BowlpoolTableHeader: React.FC<BowlpoolTableHeaderProps> = (
  props
) => {
  const [currentPlayer, setCurrentPlayer] = useState<string>(() => {
    const saved = JSON.parse(localStorage.getItem('playerName') || '');
    return saved;
  });

  useEffect(() => {
    setCurrentPlayer(JSON.parse(localStorage.getItem('playerName') || ''));
  }, [props.open]);

  return (
    <thead>
      <tr>
        {!props.hideBowlData && (
          <th className="sticky-top bg-light" id="header">
            Bowl Details
          </th>
        )}
        <th className="sticky-top bg-light" id="header">
          Matchups
        </th>
        {!props.hideBowlData && (
          <th className="sticky-top bg-light" id="header">
            Record
          </th>
        )}
        <th className="sticky-top bg-light" id="header">
          Score
        </th>
        {props.playerData !== undefined &&
          props.playerData.map((p, i) => {
            return (
              <th
                key={i}
                className={
                  currentPlayer === p.name
                    ? 'bg-warning sticky-top'
                    : 'bg-light sticky-top'
                }
                id="header"
              >
                <div
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Name placeholder"
                >
                  {p.name}
                </div>
              </th>
            );
          })}
      </tr>
    </thead>
  );
};
