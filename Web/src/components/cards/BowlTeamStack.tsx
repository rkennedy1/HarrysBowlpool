import React, { useEffect, useState } from 'react';

import { Avatar, Grid, Stack, Typography } from '@mui/material';
import { BowlTeam, Player } from '../../util/DataModels';
import { green, red } from '@mui/material/colors';

interface BowlTeamStackProps {
  winningTeam: BowlTeam;
  losingTeam: BowlTeam;
  winners: Player[];
  losers: Player[];
}

export const BowlTeamStack: React.FC<BowlTeamStackProps> = (props) => {
  return (
    <>
      {props.winningTeam && props.losingTeam && (
        <Stack>
          <Grid container>
            <Grid item xs={3}>
              <Typography noWrap>{props.winningTeam.name!}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography noWrap>{props.winningTeam.record!}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography> Winners: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                {props.winners.map((player, i) => (
                  <Grid item xs={4} lg={2}>
                    <Avatar key={i} sx={{ bgcolor: green[500] }}>
                      {player.name}
                    </Avatar>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              <Typography noWrap>{props.losingTeam.name!}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography noWrap>{props.losingTeam.record!}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography> Losers: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                {props.losers.map((player, i) => (
                  <Grid item xs={4} lg={2}>
                    <Avatar key={i} sx={{ bgcolor: red[500] }}>
                      {player.name}
                    </Avatar>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  );
};
