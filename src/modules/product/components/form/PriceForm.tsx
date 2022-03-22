import { Box, Checkbox, Grid, Input, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { IPriceInventory } from '../../../../models/form';
import { baseInputStyle } from '../../pages/AddProductPage';

const titleRowForm = [
  { title: 'Memberships', require: false },
  { title: 'Tax class', require: false },
  { title: 'Price', require: true },
  { title: 'Arrival date', require: false },
  { title: 'Quantity in stock', require: true },
];

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
  } = useForm<IPriceInventory>({
    mode: 'onBlur',
  });

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
              control={control}
              name="membership"
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="membership-select-label"
                  id="membership-select"
                  color="secondary"
                  // multiple
                  // renderValue={(selected) => selected.join(', ')}
                  value={formValues.membership}
                  sx={baseInputStyle}
                  onChange={(e) => setFormValues({ ...formValues, membership: e.target.value })}
                >
                  <MenuItem value={formValues.membership}>
                    <Checkbox /> General
                  </MenuItem>
                </Select>
              )}
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
                <Controller
                  name="tax"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      sx={{ color: '#fff' }}
                      onChange={(e) => setFormValues({ ...formValues, tax: e.target.checked })}
                    />
                  )}
                />
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
                control={control}
                name="price"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="price"
                    color="secondary"
                    placeholder="0.00"
                    value={formValues.price}
                    sx={[baseInputStyle, { width: '45%' }]}
                    {...register('price', {
                      required: true,
                    })}
                    onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                  />
                )}
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
              control={control}
              name="arrivalDate"
              render={({ field }) => (
                <Input
                  {...field}
                  id="arrivalDate"
                  color="secondary"
                  value={formValues.arrivalDate}
                  sx={[baseInputStyle, { width: '70%', marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, arrivalDate: e.target.value })}
                />
              )}
            />

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="quantityInStock"
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
              />
              {errors?.quantityInStock?.type === 'required' && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  <FormattedMessage id="quantityInStockRequire" />
                </p>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default PriceInventoryForm;
