import { useState } from 'react';
import React from 'react';

// import { BowlpoolTabs } from "./BowlpoolTabs";
import { Grid, Switch, Tooltip } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { BowlpoolTable } from '../components/table/BowlpoolTable';
import { SettingsModal } from './SettingsModal';

export function Homepage() {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem('checked') || '{}';
    const initialValue = JSON.parse(saved);
    return initialValue;
  });

  const [openSettings, setOpenSettings] = React.useState(false);
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  const switchHandler = (e: React.ChangeEvent<any>) => {
    setChecked(e.target.checked);
    localStorage.setItem('checked', JSON.stringify(e.target.checked));
  };

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <h3 className="m-2">Harry's Bowlpool</h3>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Enable this slider to hide the bowl game name, date and each team's record">
            <FormControlLabel
              name="switchBowlGameDetails"
              control={<Switch checked={checked} onChange={switchHandler} />}
              label="Hide bowl game details"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Click to edit Settings">
            <FormControlLabel
              name="settingsModal"
              control={
                <SettingsModal
                  open={openSettings}
                  handleOpen={handleOpenSettings}
                  handleClose={handleCloseSettings}
                />
              }
              label=""
            />
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <BowlpoolTable
            year={2023}
            hideBowlData={checked}
            open={openSettings}
          />
        </Grid>
        {/* <BowlpoolTabs hideBowlData={checked} /> */}
      </Grid>
    </>
  );
}
