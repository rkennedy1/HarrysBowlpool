import React from 'react';
import moment from 'moment';

function convertLine(line) {
  if (line.slice(0, 1) === '+') {
    return parseFloat(line.slice(1));
  } else if (line.slice(0, 1) === '-') {
    return parseFloat(-line.slice(1));
  }
}

function checkIfHomeWon(home, away, hLine, aLine) {
  hLine = convertLine(hLine) ? convertLine(hLine) : 0;
  aLine = convertLine(aLine) ? convertLine(aLine) : 0;
  if (home !== null && away !== null) {
    return home + hLine > away + aLine;
  } else {
    return false;
  }
}

export function BowlpoolTableBody(props) {
  return (
    <tbody>
      {props.gameData !== [] &&
        props.gameData.map((g, i) => (
          <React.Fragment key={i}>
            <tr
              key={i + 'home'}
              className={
                checkIfHomeWon(
                  g.homeTeam.score,
                  g.awayTeam.score,
                  g.homeTeam.line,
                  g.awayTeam.line
                ) &&
                (g.homeTeam.score || g.awayTeam.score)
                  ? 'table-success'
                  : ''
              }
            >
              {!props.hideBowlData && <th scope="row">{g.bowlName} Bowl</th>}
              <th scope="row">Home: {g.homeTeam.name}</th>
              {!props.hideBowlData && <th>{g.homeTeam.record}</th>}
              <th>
                {g.homeTeam.line
                  ? g.homeTeam.score || g.awayTeam.score
                    ? `${g.homeTeam.score} (${g.homeTeam.line})`
                    : `N/A (${g.homeTeam.line})`
                  : g.homeTeam.score || g.awayTeam.score
                  ? g.homeTeam.score
                  : 'N/A'}
              </th>
              {props.playerData !== [] &&
                props.playerData.map((player, j) => {
                  return player.picks.map((pick, q) => {
                    if (pick.gameId === g.gameId) {
                      return checkIfHomeWon(
                        g.homeTeam.score,
                        g.awayTeam.score,
                        g.homeTeam.line,
                        g.awayTeam.line
                      ) &&
                        (g.homeTeam.score || g.awayTeam.score) ? (
                        <td key={j + q + 'home'} className="entry">
                          {pick.isHome ? '1' : ''}
                        </td>
                      ) : (
                        <td key={j + q + 'home'} className="entry">
                          {pick.isHome ? 'X' : ''}
                        </td>
                      );
                    } else {
                      return '';
                    }
                  });
                })}
            </tr>
            <tr
              key={i + 'away'}
              className={
                !checkIfHomeWon(
                  g.homeTeam.score,
                  g.awayTeam.score,
                  g.homeTeam.line,
                  g.awayTeam.line
                ) &&
                (g.homeTeam.score || g.awayTeam.score)
                  ? 'table-success'
                  : 'bg-light'
              }
            >
              {!props.hideBowlData && (
                <th scope="row" id="away">
                  {moment(
                    g.startTime.toLocaleString('en-us', {
                      timeZone: 'America/Los_Angeles'
                    })
                  ).format('ddd MM/DD hh:mma')}
                </th>
              )}
              <th scope="row" className="" id="away">
                Away: {g.awayTeam.name}
              </th>
              {!props.hideBowlData && <th id="away">{g.awayTeam.record}</th>}
              <th id="away">
                {g.awayTeam.line
                  ? g.awayTeam.score || g.homeTeam.score
                    ? `${g.awayTeam.score} (${g.awayTeam.line})`
                    : `N/A (${g.awayTeam.line})`
                  : g.awayTeam.score || g.homeTeam.score
                  ? g.awayTeam.score
                  : 'N/A'}
              </th>
              {props.playerData !== [] &&
                props.playerData.map((player, j) =>
                  player.picks.map((pick, q) => {
                    if (pick.gameId === g.gameId) {
                      return !checkIfHomeWon(
                        g.homeTeam.score,
                        g.awayTeam.score,
                        g.homeTeam.line,
                        g.awayTeam.line
                      ) &&
                        (g.homeTeam.score || g.awayTeam.score) ? (
                        <td key={j + q + 'away'} className="entry" id="away">
                          {!pick.isHome ? '1' : ''}
                        </td>
                      ) : (
                        <td key={j + q + 'away'} className="entry" id="away">
                          {!pick.isHome ? 'X' : ''}
                        </td>
                      );
                    } else {
                      return '';
                    }
                  })
                )}
            </tr>
            <tr>
              <td>
                <br></br>
              </td>
            </tr>
          </React.Fragment>
        ))}
    </tbody>
  );
}
