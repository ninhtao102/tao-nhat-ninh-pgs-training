import { Box, Checkbox, Grid, Typography } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { IUserParams } from '../../../../models/user';

interface Props {
  control: Control<IUserParams, any>;
}

const Tax = (props: Props) => {
  const { control } = props;

  return (
    <>
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '5vh' }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ color: '#fff' }}>
          Access information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box sx={{ display: 'flex', padding: '1vh 0 10vh 0' }}>
              <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff', textAlign: 'end' }}>
                Tax exempt
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Controller
              control={control}
              name="taxExempt"
              render={({ field }) => <Checkbox {...field} id="tax-checkbox" sx={{ color: '#fff' }} />}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Tax;
