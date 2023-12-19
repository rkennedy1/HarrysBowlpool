import React from 'react';
import moment from 'moment';
import { BowlpoolTableCell } from './BowlpoolTableCell';
import { BowlGame, Player } from '../../util/DataModels';

interface BowlpoolTableAwayRowProps {
  game: BowlGame;
  playerData: Player[];
  didWin: boolean;
  hideBowlData: boolean;
  unPlayed: boolean;
  teamId: number;
}

export const BowlpoolTableAwayRow: React.FC<BowlpoolTableAwayRowProps> = (
  props
) => {
  return (
    <tr
      className={props.didWin && !props.unPlayed ? 'table-success' : 'bg-light'}
    >
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
        {props.game.awayTeam.line && props.game.awayTeam.line !== '0'
          ? props.game.awayTeam.score || props.game.homeTeam.score
            ? `${props.game.awayTeam.score} (${props.game.awayTeam.line})`
            : `N/A (${props.game.awayTeam.line})`
          : props.game.awayTeam.score || props.game.homeTeam.score
          ? props.game.awayTeam.score.toString()
          : 'N/A'}
      </th>
      {props.playerData !== undefined &&
        props.playerData.map((player, j) =>
          player.picks.map((pick, q) => {
            if (pick.gameId === props.game.gameId) {
              return pick.teamId === props.teamId ? (
                <td key={q} id="away"></td>
              ) : (
                <BowlpoolTableCell
                  key={q}
                  didWin={props.didWin}
                  id="away"
                  unPlayed={props.unPlayed}
                />
              );
            } else {
              return '';
            }
          })
        )}
    </tr>
  );
};
