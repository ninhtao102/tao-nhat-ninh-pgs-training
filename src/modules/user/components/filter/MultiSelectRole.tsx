import { Box, Checkbox, FormControl, ListItemIcon, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import { IUserRole } from '../../../../models/filter';
import { API_HEADER, API_PATHS } from '../../../../configs/api';

interface Props {}

const options = [
  //   { id: '0', name: 'All membership' },
  { id: '1', name: 'Membership' },
  { id: '2', name: 'Pending membership' },
];

const MultiSelectRole = (props: Props) => {
  const [selected, setSelected] = useState([]);
  const [role, setRole] = useState<IUserRole[]>();

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === 'all') {
      // setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
  };

  const fetchRole = useCallback(() => {
    fetch(API_PATHS.role, API_HEADER)
      .then((response) => response.json())
      .then((data) => {
        const ad = data.data?.administrator;
        const cus = data.data?.customer;
        const item = ad.concat(cus);

        setRole(item);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  return (
    <>
      <Box>
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
            {role?.map((item) => (
              <Box key={item.id}>
                <MenuItem value={item.id}>
                  <ListItemIcon>
                    <Checkbox
                    // checked={selected.indexOf(item) > -1}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </MenuItem>
              </Box>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default MultiSelectRole;
