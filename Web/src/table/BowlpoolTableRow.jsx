import React from 'react';
import { BowlpoolTableHomeRow } from './BowlpoolTableHomeRow';
import { BowlpoolTableAwayRow } from './BowlpoolTableAwayRow';

function convertLine(line) {
  console.log(line);
  if (line.length > 1) {
    if (line.slice(0, 1) === '+') {
      return parseFloat(line.slice(1));
    } else if (line.slice(0, 1) === '-') {
      return parseFloat(-line.slice(1));
    }
  }
}

function checkIfHomeWon(game) {
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

export function BowlpoolTableRow(props) {
  return (
    <React.Fragment>
      <BowlpoolTableHomeRow
        game={props.gameData}
        playerData={props.playerData}
        didWin={checkIfHomeWon(props.gameData)}
      />
      <BowlpoolTableAwayRow
        game={props.gameData}
        playerData={props.playerData}
        didWin={!checkIfHomeWon(props.gameData)}
      />
      <tr>
        <td>
          <br></br>
        </td>
      </tr>
    </React.Fragment>
  );
}
