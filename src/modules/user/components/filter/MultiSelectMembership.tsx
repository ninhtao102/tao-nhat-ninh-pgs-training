import { Box, Checkbox, FormControl, ListItemIcon, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { options } from '../../constant';

interface Props {}

const MultiSelectMembership = (props: Props) => {
  const [selected, setSelected] = useState([]);

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === 'all') {
      // setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
  };

  return (
    <>
      <FormControl>
        <Select
          multiple
          color="secondary"
          value={selected}
          onChange={handleChange}
          sx={{ width: '29vh', height: '40px', border: '1px solid black', backgroundColor: '#252547' }}
          renderValue={(selected: any) => selected.join(', ')}
          // MenuProps={MenuProps}
        >
          {options.map((option) => (
            <Box key={option.id}>
              <Typography sx={{ padding: '0 2vh' }}>{option.name}</Typography>
              <MenuItem value={option.id} sx={{ padding: '0 5vh' }}>
                <ListItemIcon>
                  <Checkbox
                  // checked={selected.indexOf(option) > -1}
                  />
                </ListItemIcon>
                <ListItemText primary={'General'} />
              </MenuItem>
            </Box>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MultiSelectMembership;
