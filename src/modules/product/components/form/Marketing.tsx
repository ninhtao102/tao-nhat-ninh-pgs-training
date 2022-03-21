import { Box, Grid, InputAdornment, MenuItem, Select, TextField, Typography, Input } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { API_HEADER, API_PATHS } from '../../../../configs/api';
import { IMarketing } from '../../../../models/form';

const baseInputStyle = {
  backgroundColor: '#252547',
  width: '80%',
  height: '40px',
  border: '0.1px solid #111',
  borderRadius: '2px',
  '&: hover': {
    backgroundColor: '#1b1b38',
  },
};

const titleRowForm = [
  { title: 'Open Graph meta tags', paddingValue: '1vh' },
  { title: 'Meta description', paddingValue: '2vh' },
  { title: 'Meta keywords', paddingValue: '2vh' },
  { title: 'Product page title', paddingValue: '2vh' },
  { title: 'Add to Facebook product feed', paddingValue: '3vh' },
  { title: 'Add to Google product feed', paddingValue: '2vh' },
];

interface Props {}

const Marketing = (props: Props) => {
  const [formValues, setFormValues] = useState<IMarketing>({
    metaTags: '',
    metaDesc: '',
    metaKeywords: '',
    productPageTitle: '',
    facebookFeed: false,
    googleFeed: false,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMarketing>();

  return (
    <form>
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '2vh 5vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Marketing
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            {titleRowForm.map((title, i) => {
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
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="meta-tags-select-label"
                  id="meta-tags-select"
                  color="secondary"
                  value={formValues.metaTags}
                  sx={baseInputStyle}
                  onChange={(e) => setFormValues({ ...formValues, metaTags: e.target.value })}
                >
                  <MenuItem value={formValues.metaTags}></MenuItem>
                </Select>
              )}
              name="metaTags"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="meta-tags-select-label"
                  id="meta-tags-select"
                  color="secondary"
                  value={formValues.metaTags}
                  sx={[baseInputStyle, { marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, metaTags: e.target.value })}
                >
                  <MenuItem value={formValues.metaTags}></MenuItem>
                </Select>
              )}
              name="metaTags"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="metaKeywords"
                  color="secondary"
                  className="metaKeywords"
                  value={formValues.metaKeywords}
                  sx={[baseInputStyle, { marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, metaKeywords: e.target.value })}
                />
              )}
              name="metaKeywords"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="productPageTitle"
                  color="secondary"
                  className="productPageTitle"
                  value={formValues.productPageTitle}
                  sx={[baseInputStyle, { marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, productPageTitle: e.target.value })}
                />
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
