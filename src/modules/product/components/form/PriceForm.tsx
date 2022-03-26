import { Box, Checkbox, Grid, Input, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller } from 'react-hook-form';
import { IProductParams } from '../../../../models/product';
import { titlePriceForm } from '../../constant';
import { baseInputStyle } from '../../pages/AddProductPage';

interface Props {
  control: Control<IProductParams, any>;
}

const PriceInventoryForm = (props: Props) => {
  const { control } = props;
  const [startDate, setStartDate] = useState(new Date());

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
                rules={{
                  required: { value: true, message: 'This field is requierd' },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="price"
                    color="secondary"
                    placeholder="0.00"
                    sx={[baseInputStyle, { width: '45%' }]}
                  />
                )}
                //   {errors?.?.message && (
                //   <p className="valid-field--message" style={{ padding: '1vh' }}>
                //     {errors?.?.message}
                //   </p>
                // )}
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
                rules={{
                  required: { value: true, message: 'This field is requierd' },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="quantityInStock"
                    color="secondary"
                    sx={[baseInputStyle, { width: '40%', marginTop: '2vh' }]}
                  />
                )}
              />
              {/* {errors?.?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.?.message}
                </p>
              )} */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default PriceInventoryForm;
