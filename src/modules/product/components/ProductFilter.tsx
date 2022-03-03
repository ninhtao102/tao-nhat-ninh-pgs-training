import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Grid, Input, MenuItem, Select, Typography, Drawer, Collapse } from '@mui/material';
import React, { useState } from 'react';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';

interface Props {}

const ProductFilter = (props: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

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
                <Input
                  color="secondary"
                  placeholder="Search keywords"
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
                />
              </Grid>
              <Grid item xs={3}>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  color="secondary"
                  defaultValue="all"
                  sx={{
                    backgroundColor: '#252547',
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
                  <MenuItem value={'all'}>Any category</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  labelId="stock-status-select-label"
                  id="stock-status-select"
                  color="secondary"
                  defaultValue="all"
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
                  <MenuItem value={'all'}>Any stock status</MenuItem>
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
              <Grid item xs={2}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    sx={{ color: '#fff', alignSelf: 'center' }}
                  >
                    Search in:
                  </Typography>
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
                    defaultValue="all"
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
                    <MenuItem value={'all'}>Any availability status</MenuItem>
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
