import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import { Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, Grid, Input, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { API_HEADER, API_PATHS } from '../../../../configs/api';
import { IProductFilter } from '../../../../models/filter';
import { ICategories, IVendors } from '../../../../models/utils';
import { availability, stockStatus } from '../../constant';
import { selectBaseStyles } from '../../pages/AddProductPage';

interface Props {
  handleFilter: (data: IProductFilter) => void;
}

const ProductFilter = (props: Props) => {
  const { handleFilter } = props;
  const [open, setOpen] = useState(false);
  const [searchType, setSearchType] = useState<any>([]);
  const [vendors, setVendors] = useState<IVendors[]>();
  const [categoriesSelector, setCategoriesSelector] = useState<ICategories[]>();
  const { control, setValue, getValues, handleSubmit } = useForm<IProductFilter>();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const onSubmit = (data: IProductFilter) => {
    console.log('IProductFilter', data);

    handleFilter(data);
  };

  const fetchCategories = useCallback(() => {
    fetch(API_PATHS.categories)
      .then((response) => response.json())
      .then((data) => {
        setCategoriesSelector(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const fetchData = useCallback(() => {
    fetch(API_PATHS.vendors, {
      method: 'post',
      ...API_HEADER,
    })
      .then((response) => response.json())
      .then((data) => {
        setVendors(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                  name="search"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="outlined-basic"
                      color="secondary"
                      placeholder="Search keywords"
                      sx={[
                        {
                          '&: hover': {
                            backgroundColor: '#1b1b38',
                          },
                        },
                        selectBaseStyles,
                      ]}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <select {...field} defaultValue={0} style={selectBaseStyles}>
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
                  name="stock_status"
                  render={({ field }) => (
                    <select {...field} defaultValue={'all'} style={selectBaseStyles}>
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
                  type="submit"
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
                    <Controller
                      control={control}
                      name="search_type"
                      render={({ field }) => (
                        <FormControl {...field}>
                          <FormControlLabel
                            value="name"
                            label="Name"
                            labelPlacement="end"
                            onBlur={() => {
                              const isTrue = getValues('search_type');
                              isTrue
                                ? searchType.unshift('name') && setValue('search_type', searchType.toString())
                                : searchType.splice(searchType.indexOf('name'), 1) &&
                                  setValue('search_type', searchType.toString());
                            }}
                            control={<Checkbox sx={{ color: '#fff' }} />}
                          />
                          <FormControlLabel
                            value="sku"
                            label="SKU"
                            labelPlacement="end"
                            onBlur={() => {
                              const isTrue = getValues('search_type');
                              isTrue
                                ? searchType.push('sku') && setValue('search_type', searchType.toString())
                                : searchType.splice(searchType.indexOf('sku'), 1) &&
                                  setValue('search_type', searchType.toString());
                            }}
                            control={<Checkbox sx={{ color: '#fff' }} />}
                          />
                          <FormControlLabel
                            value="description"
                            label="Full Description"
                            labelPlacement="end"
                            onBlur={() => {
                              const isTrue = getValues('search_type');
                              isTrue
                                ? searchType.push('description') && setValue('search_type', searchType.toString())
                                : searchType.splice(searchType.indexOf('description'), 1) &&
                                  setValue('search_type', searchType.toString());
                            }}
                            control={<Checkbox sx={{ color: '#fff' }} />}
                          />
                        </FormControl>
                      )}
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
                      <select {...field} defaultValue={'all'} style={selectBaseStyles}>
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
                  <Controller
                    control={control}
                    name="vendor"
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          list="vendors"
                          style={selectBaseStyles}
                          onChange={(e) => {
                            // console.log('vendors', getValues('vendor'));
                            // console.log('vendor', setVendors(e.target.value.data));
                          }}
                        />
                        <datalist id="vendors">
                          {vendors?.map((i) => (
                            <option key={i.id} value={i.name} />
                          ))}
                        </datalist>
                      </>
                    )}
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
    </form>
  );
};

export default ProductFilter;
