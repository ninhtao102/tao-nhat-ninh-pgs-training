import React, { useState } from 'react';
import { Box, Button, Grid, Input, MenuItem, Select, TextField, Typography, Switch, Checkbox } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ITax } from '../../../../models/form';

interface Props {}

const Tax = (props: Props) => {
  const [formValues, setFormValues] = useState<ITax>({
    tax: false,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITax>();

  return (
    <form>
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '5vh 5vh 10vh 5vh' }}>
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
              render={({ field }) => (
                <Checkbox
                  {...field}
                  id="tax-checkbox"
                  sx={{ color: '#fff' }}
                  //   onChange={(e) => setFormValues({ ...formValues, tax: e.target.checked })}
                />
              )}
              name="tax"
              control={control}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Tax;
