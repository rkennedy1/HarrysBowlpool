import React, { useEffect, useState } from 'react';
import { BowlGame, Player } from '../../util/DataModels';
import { Avatar, Card, Stack } from '@mui/material';
import { green, red } from '@mui/material/colors';

interface GameCardProps {
  winners: Player[];
  losers: Player[];
}

export const PlayersStack: React.FC<GameCardProps> = (props) => {
  return <Stack spacing={2}></Stack>;
};
