import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { BowlpoolTable } from './table/BowlpoolTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export function BowlpoolTabs(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="2022" {...a11yProps(0)} />
          <Tab label="2021" {...a11yProps(1)} />
          <Tab label="2019" {...a11yProps(2)} />
          <Tab label="2018" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BowlpoolTable year={2022} hideBowlData={props.hideBowlData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BowlpoolTable year={2021} hideBowlData={props.hideBowlData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BowlpoolTable year={2019} hideBowlData={props.hideBowlData} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BowlpoolTable year={2018} hideBowlData={props.hideBowlData} />
      </TabPanel>
    </Box>
  );
}
