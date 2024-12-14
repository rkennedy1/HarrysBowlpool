// src/presentation/bowlpool/TeamView.tsx
import { BowlTeam, Pick } from '@/data/DataModels';
import styled from '@emotion/styled';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import { useBowlpool } from '@/context/BowlpoolContext';
import { BowlPlayer } from './BowlPlayer';

type props = {
  team: BowlTeam;
  didWin: boolean;
};

const FlexyBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TeamView: React.FC<props> = ({ team, didWin }) => {
  const { players } = useBowlpool();
  const picks: Pick[] = players.flatMap((player) =>
    player.picks.filter((pick) => pick.teamId === team.teamId)
  );
  const topScorers = players.sort((a, b) => b.points - a.points).slice(0, 3);
  const line = team.line < 0 ? `(${team.line.toString()})` : ``;
  return (
    <Card
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: didWin ? '#4CAF50' : 'white'
      }}
    >
      <FlexyBox>
        <Typography align="center" variant="h6" style={{ marginRight: '8px' }}>
          {team.name} {line}
        </Typography>
        <Typography align="center" variant="body1">
          {team.record}
        </Typography>
      </FlexyBox>
      <FlexyBox>
        {picks &&
          picks.map((pick) => (
            <BowlPlayer pick={pick} topScorers={topScorers} />
          ))}
      </FlexyBox>
    </Card>
  );
};
