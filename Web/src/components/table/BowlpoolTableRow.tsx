import React from 'react';
import { BowlpoolTableHomeRow } from './BowlpoolTableHomeRow';
import { BowlpoolTableAwayRow } from './BowlpoolTableAwayRow';
import { BowlGame, Player } from '../../util/DataModels';

function convertLine(line: string): number {
  if (line.length > 1) {
    let parsedLine = parseFloat(line.slice(1));
    if (line.slice(0, 1) === '+') {
      return parsedLine;
    } else if (line.slice(0, 1) === '-') {
      return -parsedLine;
    }
  }
  return 0;
}

function checkIfWon(game: BowlGame, isHome: boolean) {
  let homeTeamLine = convertLine(game.homeTeam.line)
    ? convertLine(game.homeTeam.line)
    : 0;
  let awayTeamLine = convertLine(game.awayTeam.line)
    ? convertLine(game.awayTeam.line)
    : 0;
  let convertedHomeScore = game.homeTeam.score + homeTeamLine;
  let convertedAwayScore = game.awayTeam.score + awayTeamLine;
  if (game.homeTeam.score !== null && game.awayTeam.score !== null) {
    if (convertedHomeScore === convertedAwayScore) return true;
    if (isHome) {
      return convertedHomeScore > convertedAwayScore;
    } else {
      return convertedAwayScore > convertedHomeScore;
    }
  } else {
    return false;
  }
}

interface BowlpoolTableRowProps {
  gameData: BowlGame;
  playerData: Player[];
  hideBowlData: boolean;
}

export const BowlpoolTableRow: React.FC<BowlpoolTableRowProps> = (props) => {
  return (
    <React.Fragment>
      <BowlpoolTableHomeRow
        game={props.gameData}
        playerData={props.playerData}
        didWin={checkIfWon(props.gameData, true)}
        unPlayed={!props.gameData.completed}
        hideBowlData={props.hideBowlData}
        teamId={props.gameData.homeTeam.teamId}
      />
      <BowlpoolTableAwayRow
        game={props.gameData}
        playerData={props.playerData}
        didWin={checkIfWon(props.gameData, false)}
        unPlayed={!props.gameData.completed}
        hideBowlData={props.hideBowlData}
        teamId={props.gameData.homeTeam.teamId}
      />
      <tr>
        <td>
          <br></br>
        </td>
      </tr>
    </React.Fragment>
  );
};
