import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  Input,
  MenuItem,
  Typography,
  Select,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { API_PATHS } from '../../../../configs/api';
import { Controller, useForm } from 'react-hook-form';
import { IProductFilter } from '../../../../models/filter';
import { ICategories } from '../../../../models/utils';

interface Props {}

const stockStatus = ['In stock', 'Low stock', 'SOLD'];
const availability = ['Only enabled', 'Only disabled'];

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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductFilter>();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const fetchData = useCallback(() => {
    fetch(API_PATHS.categories)
      .then((response) => response.json())
      .then((data) => {
        console.log('category:', data);
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
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="outlined-basic"
                      color="secondary"
                      className="keywords"
                      value={filterValues.keywords}
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
                      // onChange={(e) => setFilterValues({ ...filterValues, keywords: e.target.value })}
                    />
                  )}
                  name="keywords"
                  control={control}
                />
              </Grid>
              <Grid item xs={3}>
                <Select
                  color="secondary"
                  // onChange={(e) => {setCategoriesSelector(e.target.value)}}
                  sx={{
                    backgroundColor: '#252547',
                    color: '#fff',
                    width: '100%',
                    height: '40px',
                    '&: hover': {
                      backgroundColor: '#1b1b38',
                    },
                  }}
                  value={categoriesSelector}
                >
                  {(categoriesSelector || []).map((item) => {
                    return (
                      <MenuItem key={item.id} value={categoriesSelector?.length}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  labelId="stock-status-select-label"
                  id="stock-status-select"
                  color="secondary"
                  sx={{
                    backgroundColor: '#252547',
                    color: '#fff',
                    width: '100%',
                    height: '40px',
                    '&: hover': {
                      backgroundColor: '#1b1b38',
                    },
                  }}
                  //   value={stockStatus}
                  //   onChange={handleChange}
                >
                  {stockStatus.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
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
                    sx={{ color: '#fff', alignSelf: 'center', marginLeft: '16px' }}
                  >
                    Availability
                  </Typography>
                  <Select
                    labelId="availability-select-label"
                    id="availability-select"
                    color="secondary"
                    sx={{
                      backgroundColor: '#252547',
                      margin: '0 16px',
                      color: '#fff',
                      width: '100%',
                      height: '40px',
                      '&: hover': {
                        backgroundColor: '#1b1b38',
                      },
                    }}
                    //   value={category}
                    //   onChange={handleChange}
                  >
                    {availability.map((item, i) => {
                      return (
                        <MenuItem key={i} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', flexDirection: 'space-between' }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    sx={{ color: '#fff', alignSelf: 'center', marginLeft: '16px' }}
                  >
                    Vendor
                  </Typography>
                  <Input
                    color="secondary"
                    sx={{
                      backgroundColor: '#252547',
                      color: '#fff',
                      margin: '0 16px',
                      padding: '0 16px',
                      border: '1px solid #b18aff',
                      borderRadius: '5px',
                      width: '100%',
                      height: '40px',
                      '&: hover': {
                        backgroundColor: '#1b1b38',
                      },
                    }}
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
