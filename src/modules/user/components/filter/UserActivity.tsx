import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import React from 'react';

interface Props {}

const UserActivity = (props: Props) => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff', padding: '1vh 2vw' }}>
          User activity
        </Typography>
        <Box>
          <FormControlLabel sx={{ color: '#fff' }} control={<Checkbox sx={{ color: '#fff' }} />} label="Register" />
          <FormControlLabel
            sx={{ color: '#fff' }}
            control={<Checkbox sx={{ color: '#fff' }} />}
            label="Last logged in"
          />
        </Box>
      </Box>
    </>
  );
};

export default UserActivity;
