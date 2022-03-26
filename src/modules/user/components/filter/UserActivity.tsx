import { Box, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dataType } from '../../constant';
import { baseInputStyle } from '../../pages/AddUserPage';

interface Props {}

const UserActivity = (props: Props) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <>
      <FormControl sx={{}}>
        <FormLabel id="data_type-radio-buttons-group-label" sx={{ color: '#fff', padding: '1vh 2vw' }}>
          User activity
        </FormLabel>
        <RadioGroup
          aria-labelledby="data_type-radio-buttons-group-label"
          defaultValue={'R'}
          name="data_type-radio-buttons-group"
        >
          {dataType?.map((i) => {
            return (
              <FormControlLabel key={i.id} value={i.value} control={<Radio />} label={i.name} sx={{ color: '#fff' }} />
            );
          })}
        </RadioGroup>
      </FormControl>
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
