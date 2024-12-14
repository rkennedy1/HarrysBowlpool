import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, Paper } from '@mui/material';
import styled from '@emotion/styled';
import { Player } from '@/data/DataModels';
import { getPlayers } from '@/data/Players';

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  const StyledBox = styled(Box)`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const StyledList = styled(List)`
    width: 100%;
    max-width: 600px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `;

  const StyledListItem = styled(ListItem)`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
      border-bottom: none;
    }
  `;

  const PlayerName = styled(Typography)`
    font-weight: bold;
  `;

  const PlayerPoints = styled(Typography)`
    color: #757575;
  `;

  return (
    <StyledBox>
      <Typography variant="h4" mb={3}>
        Leaderboard
      </Typography>
      <StyledList>
        {players
          .sort((a, b) => b.points - a.points)
          .map((player, index) => (
            <StyledListItem key={index}>
              <PlayerName variant="h6">
                {index + 1}. {player.name}
              </PlayerName>
              <PlayerPoints variant="h6">{player.points} points</PlayerPoints>
            </StyledListItem>
          ))}
      </StyledList>
    </StyledBox>
  );
};

export default Leaderboard;
