import React from 'react';
import { BowlpoolTableCell } from './BowlpoolTableCell';
import { BowlGame, Player } from '../../util/DataModels';

interface BowlpoolTableHomeRowProps {
  didWin: boolean;
  hideBowlData: boolean;
  game: BowlGame;
  playerData: Player[];
  unPlayed: boolean;
  teamId: number;
}

export const BowlpoolTableHomeRow: React.FC<BowlpoolTableHomeRowProps> = (
  props
) => {
  return (
    <tr className={props.didWin && !props.unPlayed ? 'table-success' : ''}>
      {!props.hideBowlData && <th scope="row">{props.game.bowlName} Bowl</th>}
      <th scope="row">Home: {props.game.homeTeam.name}</th>
      {!props.hideBowlData && <th>{props.game.homeTeam.record}</th>}
      <th>
        {props.game.homeTeam.line && props.game.homeTeam.line !== '0'
          ? props.game.homeTeam.score || props.game.awayTeam.score
            ? `${props.game.homeTeam.score} (${props.game.homeTeam.line})`
            : `N/A (${props.game.homeTeam.line})`
          : props.game.homeTeam.score || props.game.awayTeam.score
          ? props.game.homeTeam.score.toString()
          : 'N/A'}
      </th>
      {props.playerData !== undefined &&
        props.playerData.map((player, j) => {
          return player.picks.map((pick, q) => {
            if (pick.gameId === props.game.gameId) {
              return pick.teamId === props.teamId ? (
                <BowlpoolTableCell
                  key={q}
                  didWin={props.didWin}
                  id={''}
                  unPlayed={props.unPlayed}
                />
              ) : (
                <td key={q}></td>
              );
            } else {
              return '';
            }
          });
        })}
    </tr>
  );
};
