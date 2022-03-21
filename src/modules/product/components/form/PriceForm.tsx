import { Box, Checkbox, Grid, Input, InputAdornment, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IPriceInventory } from '../../../../models/form';

const titleRowForm = [
  { title: 'Memberships', require: false },
  { title: 'Tax class', require: false },
  { title: 'Price', require: true },
  { title: 'Arrival date', require: false },
  { title: 'Quantity in stock', require: true },
];

const baseInputStyle = {
  backgroundColor: '#252547',
  color: '#fff',
  padding: '0 16px',
  border: '0.1px solid #111',
  width: '80%',
  height: '40px',
  '&: hover': {
    backgroundColor: '#1b1b38',
  },
};

interface Props {}

const PriceInventoryForm = (props: Props) => {
  const [formValues, setFormValues] = useState<IPriceInventory>({
    membership: '',
    tax: false,
    price: '',
    sale: false,
    saledPrice: '',
    arrivalDate: '',
    quantityInStock: '',
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPriceInventory>();

  return (
    <form>
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '2vh 5vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Prices &amp; Inventory
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            {titleRowForm.map((title, i) => {
              return (
                <Box key={i} sx={{ display: 'flex', padding: '1.2vh 0' }}>
                  <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
                    {title.title}
                  </Typography>
                  {title.require === true ? <span style={{ color: 'red' }}>*</span> : null}
                </Box>
              );
            })}
          </Grid>

          <Grid item xs={6}>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="membership-select-label"
                  id="membership-select"
                  color="secondary"
                  value={formValues.membership}
                  sx={[baseInputStyle]}
                  onChange={(e) => setFormValues({ ...formValues, membership: e.target.value })}
                >
                  <MenuItem value={formValues.membership}>
                    <Checkbox /> General
                  </MenuItem>
                </Select>
              )}
              name="membership"
              control={control}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '70%',
                marginTop: '1vh',
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{ color: '#fff', alignSelf: 'flex-end' }}
              >
                Default
              </Typography>
              <Box sx={{ display: 'inline-flex' }}>
                <Checkbox sx={{ color: '#fff' }} />
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  sx={{ color: '#fff', alignSelf: 'flex-end' }}
                >
                  Tax Exempt
                </Typography>
              </Box>
            </Box>

            <Box>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    id="price"
                    color="secondary"
                    placeholder="0.00"
                    className="price"
                    inputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    value={formValues.price}
                    sx={[baseInputStyle, { width: '45%' }]}
                    {...register('price', {
                      required: true,
                    })}
                    onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                  />
                )}
                name="price"
                control={control}
              />

              <Box sx={{ display: 'inline-flex', marginLeft: '3vh' }}>
                <Checkbox sx={{ color: '#fff' }} />
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  sx={{ color: '#fff', alignSelf: 'flex-end' }}
                >
                  Sale
                </Typography>
              </Box>
            </Box>

            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="arrivalDate"
                  color="secondary"
                  className="arrivalDate"
                  value={formValues.arrivalDate}
                  sx={[baseInputStyle, { width: '70%', marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, arrivalDate: e.target.value })}
                />
              )}
              name="arrivalDate"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="quantityInStock"
                  color="secondary"
                  className="quantityInStock"
                  value={formValues.quantityInStock}
                  sx={[baseInputStyle, { width: '40%', marginTop: '2vh' }]}
                  {...register('quantityInStock', {
                    required: true,
                  })}
                  onChange={(e) => setFormValues({ ...formValues, quantityInStock: e.target.value })}
                />
              )}
              name="quantityInStock"
              control={control}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default PriceInventoryForm;
