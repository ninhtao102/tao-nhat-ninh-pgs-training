import { Box, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { API_HEADER, API_PATHS } from '../../../../configs/api';
import { IShipping, IZone } from '../../../../models/form';

const baseInputStyle = {
  backgroundColor: '#252547',
  border: '0.1px solid #111',
  borderRadius: '2px',
  '&: hover': {
    backgroundColor: '#1b1b38',
  },
};

interface Props {}

const ShippingForm = (props: Props) => {
  const [zone, setZone] = useState<IZone[]>();
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
        setZone(data.data);
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

          <Grid item xs={6}>
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

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '2vh' }}>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="zone-select-label"
                    id="zone-select"
                    color="secondary"
                    value={formValues.zone}
                    sx={[baseInputStyle, { width: '60%', height: '40px' }]}
                    onChange={(e) => setFormValues({ ...formValues, zone: e.target.value })}
                  >
                    {zone?.map((z) => {
                      return (
                        <MenuItem key={z.id} value={formValues.zone}>
                          {z.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
                name="zone"
                control={control}
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
