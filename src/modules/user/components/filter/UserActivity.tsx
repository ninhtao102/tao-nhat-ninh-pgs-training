import { Box, Checkbox, FormControlLabel, Input, Typography } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { baseInputStyle } from '../../pages/AddUserPage';

interface Props {}

const UserActivity = (props: Props) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

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
      <Box sx={{ marginLeft: '31vh' }}>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update: any) => {
            setDateRange(update);
          }}
          isClearable={true}
          customInput={<Input sx={baseInputStyle} />}
        />
      </Box>
    </>
  );
};

export default UserActivity;
