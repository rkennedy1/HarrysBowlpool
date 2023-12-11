import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { Player } from '../util/DataModels';
import { bowlpoolRepo } from '../util/bowlpoolRepo';

const bpr = new bowlpoolRepo();

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

interface settingsModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  year: number;
}

export const SettingsModal: React.FC<settingsModalProps> = (props) => {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState<string>(() => {
    const saved = localStorage.getItem('playerName') || '';
    return saved;
  });
  useEffect(() => {
    bpr.getPlayerData(props.year).then((data: Player[]) => setPlayerData(data));
  }, [props.year]);

  const handleChange = (event: SelectChangeEvent) => {
    setPlayerName(event.target.value as string);
    localStorage.setItem('playerName', JSON.stringify(event.target.value));
  };

  return (
    <div>
      <Button onClick={props.handleOpen}>Settings</Button>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Select a player to watch
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Player Name</InputLabel>{' '}
            <Select
              value={playerName}
              label="Player Name"
              onChange={handleChange}
              defaultValue={playerName}
            >
              {playerData !== undefined &&
                playerData.map((p, i) => {
                  return (
                    <MenuItem value={p.name} key={i}>
                      {p.name}
                    </MenuItem>
                  );
                })}
            </Select>{' '}
          </FormControl>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Currently Selected Player: {playerName}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
