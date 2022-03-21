import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Box, Button, Grid, Input, MenuItem, Select, TextField, Typography, Switch } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { API_HEADER, API_PATHS } from '../../../../configs/api';
import { IProductParams } from '../../../../models/product';
import { IBrands, ICategories } from '../../../../models/utils';
import { validEmailRegex } from '../../../../utils';

interface Props {}

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

const titleRowForm = [
  { title: 'Vendor', require: true, paddingValue: '1vh' },
  { title: 'Product Title', require: true, paddingValue: '2vh' },
  { title: 'Brand', require: true, paddingValue: '3vh' },
  { title: 'Condition', require: true, paddingValue: '3vh' },
  { title: 'SKU', require: false, paddingValue: '3vh' },
  { title: 'Images', require: true, paddingValue: '3vh' },
  { title: 'Category', require: true, paddingValue: '10vh' },
  { title: 'Description', require: true, paddingValue: '3vh' },
  { title: 'Available for sale', require: false, paddingValue: '21vh' },
];

const AddProductForm = (props: Props) => {
  const [brands, setBrands] = useState<IBrands[]>();
  const [categories, setCategories] = useState<ICategories[]>();
  const [formValues, setFormValues] = useState<IProductParams>({
    vendor: '',
    productTitle: '',
    brand: '',
    condition: '',
    sku: '',
    images: '',
    category: '',
    description: '',
    sale: true,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductParams>();

  const fetchBrands = useCallback(() => {
    fetch(API_PATHS.brands, API_HEADER)
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const fetchCategories = useCallback(() => {
    fetch(API_PATHS.categories, API_HEADER)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, [fetchBrands, fetchCategories]);

  return (
    <form>
      <Box sx={{ backgroundColor: '#1b1b38', padding: '2vh 5vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Add Product
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            {titleRowForm.map((title, i) => {
              return (
                <Box key={i} sx={{ display: 'flex', paddingTop: title.paddingValue }}>
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
                <Input
                  {...field}
                  id="vendor"
                  color="secondary"
                  placeholder="Type Vendor to select"
                  className="vendor"
                  value={formValues.vendor}
                  sx={baseInputStyle}
                  {...register('vendor', {
                    required: true,
                  })}
                  onChange={(e) => setFormValues({ ...formValues, vendor: e.target.value })}
                />
              )}
              name="vendor"
              control={control}
            />
            {errors?.vendor?.type === 'required' && (
              <p style={{ color: 'red' }}>
                <FormattedMessage id="fieldRequire" />
              </p>
            )}

            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="outlined-basic"
                  color="secondary"
                  className="productTitle"
                  value={formValues.productTitle}
                  sx={[
                    baseInputStyle,
                    {
                      marginTop: '2vh',
                    },
                  ]}
                  {...register('productTitle', {
                    required: true,
                    pattern: validEmailRegex,
                  })}
                  onChange={(e) => setFormValues({ ...formValues, productTitle: e.target.value })}
                />
              )}
              name="productTitle"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="brand-select-label"
                  id="brand-select"
                  color="secondary"
                  value={formValues.brand}
                  sx={[
                    baseInputStyle,
                    {
                      marginTop: '2vh',
                    },
                  ]}
                  onChange={(e) => setFormValues({ ...formValues, brand: e.target.value })}
                >
                  {brands?.map((b) => {
                    return (
                      <MenuItem key={b.id} value={b.name}>
                        {b.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
              name="brand"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="condition-select-label"
                  id="condition-select"
                  color="secondary"
                  value={formValues.condition}
                  sx={[
                    baseInputStyle,
                    {
                      marginTop: '2vh',
                    },
                  ]}
                  onChange={(e) => setFormValues({ ...formValues, condition: e.target.value })}
                >
                  <MenuItem value={formValues.condition}>Used</MenuItem>
                </Select>
              )}
              name="brand"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="sku"
                  color="secondary"
                  sx={[
                    baseInputStyle,
                    {
                      marginTop: '2vh',
                    },
                  ]}
                  className="sku"
                  value={formValues.vendor}
                  onChange={(e) => setFormValues({ ...formValues, vendor: e.target.value })}
                />
              )}
              name="vendor"
              control={control}
            />

            <Button
              variant="outlined"
              component="label"
              size="large"
              sx={{ marginTop: '2vh', color: '#fff', width: '12vw', height: '12vh' }}
            >
              <CameraAltRoundedIcon fontSize="large" />
              <input type="file" accept="image/*" hidden />
            </Button>

            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="category-select-label"
                  id="category-select"
                  color="secondary"
                  value={formValues.category}
                  sx={[
                    baseInputStyle,
                    {
                      marginTop: '2vh',
                    },
                  ]}
                  onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
                >
                  {categories?.map((c) => {
                    return (
                      <MenuItem key={c.id} value={c.name}>
                        {c.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
              name="brand"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  id="description"
                  className="description"
                  value={formValues.description}
                  sx={{
                    marginTop: '2vh',
                    width: '100%',
                    border: '0.1px solid #1976d2',
                    borderRadius: '3px',
                  }}
                  placeholder="Enter text here..."
                  multiline
                  rows={8}
                  onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                />
              )}
              name="description"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Switch
                  {...field}
                  defaultChecked
                  id="sale"
                  className="sale"
                  value={formValues.sale}
                  sx={{ marginTop: '2vh' }}
                  // onChange={(e) => setFormValues({ ...formValues, sale: e.target.value })}
                />
              )}
              name="sale"
              control={control}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default AddProductForm;
