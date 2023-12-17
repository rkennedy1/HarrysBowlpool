import React from 'react';

interface BowlpoolTableCellProps {
  id: string;
  didWin: boolean;
  unPlayed: boolean;
}

export const BowlpoolTableCell: React.FC<BowlpoolTableCellProps> = (props) => {
  return (
    <td className="entry" id={props.id}>
      {props.unPlayed ? '⛏️' : props.didWin ? '✅' : '❌'}
    </td>
  );
};
