import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import { Box, Button, Checkbox, Collapse, FormControlLabel, Grid, Input, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { API_PATHS } from '../../../../configs/api';
import { IProductFilter } from '../../../../models/filter';
import { ICategories } from '../../../../models/utils';
import { selectBaseStyles } from '../../pages/AddProductPage';

interface Props {}

const stockStatus = [
  { id: '0', name: 'Any stock status' },
  { id: '1', name: 'In stock' },
  { id: '2', name: 'Low stock' },
  { id: '3', name: 'SOLD' },
];
const availability = [
  { id: '0', name: 'Any availability status' },
  { id: '1', name: 'Only enabled' },
  { id: '2', name: 'Only disabled' },
];

const ProductFilter = (props: Props) => {
  const [categoriesSelector, setCategoriesSelector] = useState<ICategories[]>();
  const [filterValues, setFilterValues] = useState<IProductFilter>({
    keywords: '',
    categories: '',
    stockStatus: '',
    availability: '',
    vendor: '',
  });
  const [open, setOpen] = useState(false);
  const {
    control,
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm<IProductFilter>();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const fetchData = useCallback(() => {
    fetch(API_PATHS.categories)
      .then((response) => response.json())
      .then((data) => {
        // console.log('categories:', data);
        setCategoriesSelector(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Box sx={{ marginTop: '10vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Products
        </Typography>
        <Collapse in={open} collapsedSize={81}>
          <Box sx={{ backgroundColor: '#323259', padding: '20px', border: '0.3px solid #000' }}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Controller
                  control={control}
                  name="keywords"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="outlined-basic"
                      color="secondary"
                      placeholder="Search keywords"
                      value={filterValues.keywords}
                      sx={[
                        {
                          '&: hover': {
                            backgroundColor: '#1b1b38',
                          },
                        },
                        selectBaseStyles,
                      ]}
                      onChange={(e) => setFilterValues({ ...filterValues, keywords: e.target.value })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  control={control}
                  name="categories"
                  render={({ field }) => (
                    <select
                      {...field}
                      defaultValue={0}
                      style={selectBaseStyles}
                      onChange={(e) => setFilterValues({ ...filterValues, categories: e.target.value })}
                    >
                      <option value={0} selected>
                        Any category
                      </option>
                      {categoriesSelector?.map((cate) => {
                        return (
                          <option key={cate.id} value={cate.id}>
                            {cate.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  control={control}
                  name="stockStatus"
                  render={({ field }) => (
                    <select
                      {...field}
                      defaultValue={0}
                      style={selectBaseStyles}
                      onChange={(e) => setFilterValues({ ...filterValues, stockStatus: e.target.value })}
                    >
                      {stockStatus.map((sst) => {
                        return (
                          <option key={sst.id} value={sst.id}>
                            {sst.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#b18aff',
                    '&: hover': {
                      backgroundColor: '#b18aff',
                      color: '#000',
                    },
                    width: '100%',
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              backgroundColor: '#323259',
              padding: '20px',
              border: '0.3px solid #000',
              borderTop: 'none',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box sx={{ width: '40vh', display: 'flex' }}>
                  <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
                    Search in:
                  </Typography>
                  <Box sx={{ color: '#fff', width: '22vh', marginLeft: '1vh' }}>
                    <FormControlLabel
                      value="name"
                      control={<Checkbox sx={{ color: '#fff' }} />}
                      label="Name"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="sku"
                      control={<Checkbox sx={{ color: '#fff' }} />}
                      label="SKU"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="fullDescription"
                      control={<Checkbox sx={{ color: '#fff' }} />}
                      label="Full Description"
                      labelPlacement="end"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', flexDirection: 'space-between' }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    sx={{ color: '#fff', alignSelf: 'center', margin: '0 16px' }}
                  >
                    Availability
                  </Typography>

                  <Controller
                    control={control}
                    name="availability"
                    render={({ field }) => (
                      <select
                        {...field}
                        defaultValue={0}
                        style={selectBaseStyles}
                        onChange={(e) => setFilterValues({ ...filterValues, availability: e.target.value })}
                      >
                        {availability.map((avai) => {
                          return (
                            <option key={avai.id} value={avai.id}>
                              {avai.name}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', flexDirection: 'space-between' }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    sx={{ color: '#fff', alignSelf: 'center', margin: '0 16px' }}
                  >
                    Vendor
                  </Typography>
                  <Input
                    color="secondary"
                    sx={[
                      {
                        '&: hover': {
                          backgroundColor: '#1b1b38',
                        },
                      },
                      selectBaseStyles,
                    ]}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
        <Button
          onClick={() => handleOpen()}
          sx={{
            display: 'flex',
            margin: 'auto',
            backgroundColor: '#323259',
            zIndex: 2,
            bottom: '10px',
            '&: hover': { backgroundColor: '#323259' },
          }}
        >
          <KeyboardDoubleArrowDownRoundedIcon />
        </Button>
      </Box>
    </>
  );
};

export default ProductFilter;
