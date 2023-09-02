import React from 'react';
import moment from 'moment';
import { BowlpoolTableCell } from './BowlpoolTableCell';

export function BowlpoolTableAwayRow(props) {
  return (
    <tr className={props.didWin ? 'table-success' : 'bg-light'}>
      {!props.hideBowlData && (
        <th scope="row" id="away">
          {moment(
            props.game.startTime.toLocaleString('en-us', {
              timeZone: 'America/Los_Angeles'
            })
          ).format('ddd MM/DD hh:mma')}
        </th>
      )}
      <th scope="row" className="" id="away">
        Away: {props.game.awayTeam.name}
      </th>
      {!props.hideBowlData && <th id="away">{props.game.awayTeam.record}</th>}
      <th id="away">
        {props.game.awayTeam.line
          ? props.game.awayTeam.score || props.game.homeTeam.score
            ? `${props.game.awayTeam.score} (${props.game.awayTeam.line})`
            : `N/A (${props.game.awayTeam.line})`
          : props.game.awayTeam.score || props.game.homeTeam.score
          ? props.game.awayTeam.score
          : 'N/A'}
      </th>
      {props.playerData !== [] &&
        props.playerData.map((player, j) =>
          player.picks.map((pick, q) => {
            if (pick.gameId === props.game.gameId) {
              return !pick.isHome ? (
                <BowlpoolTableCell key={q} didWin={props.didWin} id="away" />
              ) : (
                <td key={q} id="away"></td>
              );
            }
          })
        )}
    </tr>
  );
}
