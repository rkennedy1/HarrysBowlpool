import React, { useEffect, useState } from 'react';
import { BowlGame, BowlTeam, Player } from '../../util/DataModels';
import { Card, Stack } from '@mui/material';
import { BowlTeamStack } from './BowlTeamStack';
import { PlayersStack } from './PlayersStack';
import { Margin } from '@mui/icons-material';

interface GameCardProps {
  game: BowlGame;
  players: Player[];
}

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

export const GameCard: React.FC<GameCardProps> = (props) => {
  const [winners, setWinners] = useState<Player[]>([]);
  const [losers, setLosers] = useState<Player[]>([]);
  const [winningTeam, setWinningTeam] = useState<BowlTeam>();
  const [losingTeam, setLosingTeam] = useState<BowlTeam>();

  function setWinnersAndLosers(players: Player[], game: BowlGame) {
    console.log(game);
    let tempWinners: Player[] = [];
    let tempLosers: Player[] = [];

    let didHomeWin = checkIfHomeWon(game);
    players.map((player) => {
      if (didHomeWin) {
        setWinningTeam(game.homeTeam);
        setLosingTeam(game.awayTeam);

        player.picks.find((pick) => pick.gameId === game.gameId)?.isHome
          ? tempWinners.push(player)
          : tempLosers.push(player);
      } else {
        setWinningTeam(game.awayTeam);
        setLosingTeam(game.homeTeam);

        !player.picks.find((pick) => pick.gameId === game.gameId)?.isHome
          ? tempWinners.push(player)
          : tempLosers.push(player);
      }
      return player;
    });
    setWinners(tempWinners);
    setLosers(tempLosers);
    console.log('winners:' + tempWinners.map((player) => player.name));
    console.log('losers:' + tempLosers.map((player) => player.name));
  }

  useEffect(() => {
    if (props.players !== undefined && props.game !== undefined) {
      setWinnersAndLosers(props.players, props.game);
    }
  }, [props.game, props.players]);

  return (
    <Card sx={{ border: '1px black' }}>
      <Stack spacing={2} direction="row">
        <BowlTeamStack
          winningTeam={winningTeam!}
          losingTeam={losingTeam!}
          winners={winners}
          losers={losers}
        />
      </Stack>
    </Card>
  );
};
