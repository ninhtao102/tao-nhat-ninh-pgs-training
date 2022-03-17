import { Box, Grid, Input, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { API_PATHS } from '../../../../configs/api';
import { IProductParams } from '../../../../models/product';
import { validEmailRegex } from '../../../../utils';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';

interface Props {}

interface IBrands {
  id: string;
  brand: string;
}

const titleRowForm = [
  { title: 'Vendor', require: true },
  { title: 'Product Title', require: true },
  { title: 'Brand', require: true },
  { title: 'Condition', require: true },
  { title: 'SKU', require: false },
  { title: 'Images', require: true },
  { title: 'Category', request: true },
  { title: 'Description', request: true },
  { title: 'Available', request: false },
];

const AddProductForm = (props: Props) => {
  const [brands, setBrands] = useState<IBrands[]>();
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
    fetch(API_PATHS.brands, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('brands:', data);
        setBrands(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

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
                <Box key={i} sx={{ display: 'flex', padding: '1vh 0' }}>
                  <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
                    {title.title}
                  </Typography>
                  {title.require === true ? <span style={{ color: 'red' }}>*</span> : null}
                </Box>
              );
            })}
          </Grid>

          <Grid item xs={4}>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="outlined-basic"
                  color="secondary"
                  placeholder="Type Vendor to select"
                  className="vendor"
                  value={formValues.vendor}
                  sx={{
                    backgroundColor: '#252547',
                    color: '#fff',
                    padding: '0 16px',
                    border: '1px solid #b18aff',
                    width: '100%',
                    height: '40px',
                    '&: hover': {
                      backgroundColor: '#1b1b38',
                    },
                  }}
                  {...register('vendor', {
                    required: true,
                  })}
                  // onChange={(e) => setFormValues({ ...formValues, vendor: e.target.value })}
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
                  value={formValues.vendor}
                  sx={{
                    backgroundColor: '#252547',
                    color: '#fff',
                    marginTop: '2vh',
                    padding: '0 16px',
                    border: '1px solid #b18aff',
                    width: '100%',
                    height: '40px',
                    '&: hover': {
                      backgroundColor: '#1b1b38',
                    },
                  }}
                  {...register('productTitle', {
                    required: true,
                    pattern: validEmailRegex,
                  })}
                  // onChange={(e) => setFormValues({ ...formValues, productTitle: e.target.value })}
                />
              )}
              name="productTitle"
              control={control}
            />
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="outlined-basic"
                  color="secondary"
                  className="productTitle"
                  value={formValues.vendor}
                  sx={{
                    backgroundColor: '#252547',
                    color: '#fff',
                    marginTop: '2vh',
                    padding: '0 16px',
                    border: '1px solid #b18aff',
                    width: '100%',
                    height: '40px',
                    '&: hover': {
                      backgroundColor: '#1b1b38',
                    },
                  }}
                  {...register('productTitle', {
                    required: true,
                    pattern: validEmailRegex,
                  })}
                  // onChange={(e) => setFormValues({ ...formValues, productTitle: e.target.value })}
                />
              )}
              name="productTitle"
              control={control}
            />
          </Grid>
        </Grid>
      </Box>
      {/* 
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '2vh 5vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Price &#38; Inventory
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '2vh 5vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Price &#38; Inventory
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '2vh 5vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Shipping
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '2vh 5vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Marketing
        </Typography>
      </Box> 
      */}
    </form>
  );
};

export default AddProductForm;
