import React from 'react';

export function BowlpoolTableCell(props) {
  return (
    <td className="entry" id={props.id}>
      {props.didWin ? '✅' : '❌'}
    </td>
  );
}
