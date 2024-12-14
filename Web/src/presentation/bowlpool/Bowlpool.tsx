import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import styled from '@emotion/styled';
import { BowlGame, BowlTeam } from '@/data/DataModels';
import { TeamView } from './TeamView';
import BowlView from './BowlView';
import { useBowlpool } from '../../context/BowlpoolContext';

const Bowlpool: React.FC = () => {
  const { games, players, refreshData } = useBowlpool();

  useEffect(() => {
    refreshData();
  }, []);

  function getWinningTeam(game: BowlGame, team: BowlTeam): boolean {
    const homeScore = game.homeTeam.score - game.homeTeam.line;
    const awayScore = game.awayTeam.score - game.awayTeam.line;
    return (
      team.teamId ===
      (homeScore > awayScore ? game.homeTeam.teamId : game.awayTeam.teamId)
    );
  }

  const StyledBox = styled(Box)`
    margin-top: 2rem;
    min-width: 100%;
    min-height: 100%;
    align-content: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <StyledBox>
      <Typography variant="h4" mb={3}>
        Bowl Games
      </Typography>
      <List style={{ width: '100%' }}>
        {games &&
          players &&
          games.map((game, index) => (
            <ListItem key={index} sx={{ py: 2 }}>
              <Grid
                container
                rowSpacing={2}
                spacing={2}
                wrap="wrap"
                style={{
                  width: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <Grid size={5}>
                  <TeamView
                    team={game.homeTeam}
                    didWin={getWinningTeam(game, game.homeTeam)}
                  />
                </Grid>

                <Grid size={2}>
                  <BowlView game={game} />
                </Grid>

                <Grid size={5}>
                  <TeamView
                    team={game.awayTeam}
                    didWin={getWinningTeam(game, game.awayTeam)}
                  />
                </Grid>
              </Grid>
            </ListItem>
          ))}
      </List>
    </StyledBox>
  );
};

export default Bowlpool;
