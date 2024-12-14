import { Box, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { Pick, Player } from '@/data/DataModels';

type props = {
  pick: Pick;
  topScorers: Player[];
};

export const BowlPlayer: React.FC<props> = ({ pick, topScorers }) => {
  return (
    <Box display="flex" position="relative" marginX="1em">
      <Typography variant="body2">{pick.player}</Typography>
      {topScorers.slice(0, 3).map((topScorer, index) => {
        if (topScorer.name === pick.player) {
          let color;
          switch (index) {
            case 0:
              color = 'gold';
              break;
            case 1:
              color = 'silver';
              break;
            case 2:
              color = 'brown';
              break;
            default:
              color = 'transparent';
          }
          return (
            <FontAwesomeIcon
              key={index}
              icon={faCrown}
              style={{
                position: 'absolute',
                top: '-10px',
                left: '110%',
                transform: 'translateX(-50%)'
              }}
              color={color}
            />
          );
        }
        return null;
      })}
    </Box>
  );
};
