import { Box, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { API_HEADER, API_PATHS } from '../../../../configs/api';
import { IShipping } from '../../../../models/form';
import { baseInputStyle } from '../../pages/AddProductPage';
import { IShippingParams } from '../../../../models/utils';

interface Props {}

const ShippingForm = (props: Props) => {
  const [zones, setZones] = useState<IShippingParams[]>();
  const [formValues, setFormValues] = useState<IShipping>({
    continental: '',
    zone: '',
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShipping>();

  const fetchZones = useCallback(() => {
    fetch(API_PATHS.shipping, API_HEADER)
      .then((response) => response.json())
      .then((data) => {
        setZones(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  return (
    <form>
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '2vh 5vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Shipping
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box sx={{ display: 'flex', padding: '1.2vh 0' }}>
              <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
                Continental U.S.
              </Typography>
              <span style={{ color: 'red' }}>*</span>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  id="continental"
                  color="secondary"
                  placeholder="0.00"
                  className="continental"
                  value={formValues.continental}
                  sx={[baseInputStyle, { width: '65%' }]}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  {...register('continental', {
                    required: true,
                  })}
                  onChange={(e) => setFormValues({ ...formValues, continental: e.target.value })}
                />
              )}
              name="continental"
              control={control}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="zone"
                render={({ field }) => (
                  <select
                    {...field}
                    defaultValue={undefined}
                    style={baseInputStyle}
                    onChange={(e) => setFormValues({ ...formValues, zone: e.target.value })}
                  >
                    {zones?.map((zone) => {
                      return (
                        <option key={zone.id} value={zone.id} style={baseInputStyle}>
                          {zone.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              />
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{ color: '#fff', alignSelf: 'flex-end' }}
              >
                Add Shipping Location
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default ShippingForm;
