import { Box, Checkbox, Grid, Input, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { IPriceInventory } from '../../../../models/form';
import { baseInputStyle } from '../../pages/AddProductPage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { titlePriceForm } from '../../constant';

interface Props {}

const PriceInventoryForm = (props: Props) => {
  const [startDate, setStartDate] = useState(new Date());

  const {
    control,
    register,
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
            {titlePriceForm.map((title, i) => {
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
                  sx={baseInputStyle}
                >
                  <MenuItem
                  // value={formValues.membership}
                  >
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
                  render={({ field }) => <Checkbox {...field} sx={{ color: '#fff' }} />}
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
                    sx={[baseInputStyle, { width: '45%' }]}
                    {...register('price', {
                      required: true,
                    })}
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

            <Box sx={{ width: '70%', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="arrivalDate"
                render={({ field }) => (
                  <DatePicker
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    customInput={<Input sx={[baseInputStyle, { width: '100%' }]} />}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="quantityInStock"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="quantityInStock"
                    color="secondary"
                    sx={[baseInputStyle, { width: '40%', marginTop: '2vh' }]}
                    {...register('quantityInStock', {
                      required: true,
                    })}
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
