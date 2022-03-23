import { Box, Input, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { API_HEADER, API_PATHS } from '../../../../configs/api';
import { IUserFilter } from '../../../../models/filter';
import { IShippingParams } from '../../../../models/utils';

const inputStyles = {
  backgroundColor: '#252547',
  padding: '0 12px',
  color: '#fff',
  width: '75%',
  height: '40px',
  border: '1px solid #111',
  borderRadius: '5px',
};

interface Props {
  control: Control<IUserFilter, any>;
}

const AddressDetail = (props: Props) => {
  const { control } = props;
  const [countries, setCountries] = useState<IShippingParams[]>();

  const fetchCountry = useCallback(() => {
    fetch(API_PATHS.shipping, API_HEADER)
      .then((response) => response.json())
      .then((data) => {
        const newData = data.data;
        newData.shift();
        newData.unshift({ id: '', name: 'Select country' });
        // console.log('country', newData);
        setCountries(newData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchCountry();
  }, [fetchCountry]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
          Country
        </Typography>
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <select {...field} defaultValue={''} style={inputStyles}>
              {countries?.map((country) => {
                return (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          )}
        />
      </Box>
      <Box sx={{ display: 'flex', marginTop: '1vh', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
          State
        </Typography>
        <Controller
          control={control}
          name="state"
          render={({ field }) => (
            <Input
              {...field}
              id="state"
              color="secondary"
              sx={[
                {
                  '&: hover': {
                    backgroundColor: '#1b1b38',
                  },
                },
                inputStyles,
              ]}
            />
          )}
        />
      </Box>
      <Box sx={{ display: 'flex', marginTop: '1vh', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
          Address
        </Typography>
        <Controller
          control={control}
          name="address"
          render={({ field }) => (
            <Input
              {...field}
              id="address"
              color="secondary"
              sx={[
                {
                  '&: hover': {
                    backgroundColor: '#1b1b38',
                  },
                },
                inputStyles,
              ]}
            />
          )}
        />
      </Box>
      <Box sx={{ display: 'flex', marginTop: '1vh', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
          Phone
        </Typography>
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Input
              {...field}
              id="phone"
              color="secondary"
              sx={[
                {
                  '&: hover': {
                    backgroundColor: '#1b1b38',
                  },
                },
                inputStyles,
              ]}
            />
          )}
        />
      </Box>
    </>
  );
};

export default AddressDetail;
