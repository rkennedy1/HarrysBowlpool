import React from 'react';
import { BowlpoolTableRow } from './BowlpoolTableRow';

export function BowlpoolTableBody(props) {
  return (
    <tbody>
      {props.gameData !== [] &&
        props.gameData.map((g, i) => (
          <BowlpoolTableRow
            key={i}
            gameData={g}
            playerData={props.playerData}
          />
        ))}
    </tbody>
  );
}
