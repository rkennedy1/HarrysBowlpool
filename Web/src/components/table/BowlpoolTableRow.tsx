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

function checkIfHomeWon(game: BowlGame) {
  let homeTeamLine = convertLine(game.homeTeam.line)
    ? convertLine(game.homeTeam.line)
    : 0;
  let awayTeamLine = convertLine(game.awayTeam.line)
    ? convertLine(game.awayTeam.line)
    : 0;
  if (game.homeTeam.score !== null && game.awayTeam.score !== null) {
    return (
      game.homeTeam.score + homeTeamLine > game.awayTeam.score + awayTeamLine
    );
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
        didWin={checkIfHomeWon(props.gameData)}
        hideBowlData={props.hideBowlData}
      />
      <BowlpoolTableAwayRow
        game={props.gameData}
        playerData={props.playerData}
        didWin={!checkIfHomeWon(props.gameData)}
        hideBowlData={props.hideBowlData}
      />
      <tr>
        <td>
          <br></br>
        </td>
      </tr>
    </React.Fragment>
  );
};
