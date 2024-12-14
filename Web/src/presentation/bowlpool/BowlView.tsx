import { BowlGame } from '@/data/DataModels';
import { Box, Typography } from '@mui/material';
import React from 'react';

type props = {
  game: BowlGame;
};
const BowlView: React.FC<props> = ({ game }) => {
  return (
    <Box>
      <Typography align="center" variant="h6">
        {game.bowlName}
      </Typography>
      <Typography align="center" variant="h6">
        {game.homeTeam.score} - {game.awayTeam.score}
      </Typography>
      <Typography align="center" variant="body1">
        {game.startTime.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default BowlView;
