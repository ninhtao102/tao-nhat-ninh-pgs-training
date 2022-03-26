import { Box, Grid, Input, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { IProductParams } from '../../../../models/product';
import { titleMarketingForm } from '../../constant';
import { baseInputStyle } from '../../pages/AddProductPage';

interface Props {
  control: Control<IProductParams, any>;
}

const Marketing = (props: Props) => {
  const { control } = props;

  return (
    <form>
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '2vh 5vh 15vh 5vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Marketing
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            {titleMarketingForm.map((title, i) => {
              return (
                <Box key={i} sx={{ display: 'flex', paddingTop: title.paddingValue }}>
                  <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff', textAlign: 'end' }}>
                    {title.title}
                  </Typography>
                </Box>
              );
            })}
          </Grid>

          <Grid item xs={6}>
            <Controller
              control={control}
              name="metaTags"
              render={({ field }) => (
                <Select {...field} id="meta-tags-select" color="secondary" sx={baseInputStyle}>
                  <MenuItem
                  // value={formValues.metaTags}
                  ></MenuItem>
                </Select>
              )}
            />

            <Controller
              render={({ field }) => (
                <Select {...field} id="meta-desc-select" color="secondary" sx={[baseInputStyle, { marginTop: '2vh' }]}>
                  <MenuItem
                  // value={formValues.metaDesc}
                  ></MenuItem>
                </Select>
              )}
              name="metaDesc"
              control={control}
            />

            <Controller
              control={control}
              name="metaKeywords"
              render={({ field }) => (
                <Input {...field} id="metaKeywords" color="secondary" sx={[baseInputStyle, { marginTop: '2vh' }]} />
              )}
            />

            <Controller
              render={({ field }) => (
                <Input {...field} id="productPageTitle" color="secondary" sx={[baseInputStyle, { marginTop: '2vh' }]} />
              )}
              name="productPageTitle"
              control={control}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Marketing;
