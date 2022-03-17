import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { API_PATHS } from '../../../../configs/api';
import { ICountry, IUserFilter, IUserRole } from '../../../../models/filter';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';

const status = ['Enable', 'Disable', 'Unapproved vendor'];

interface Props {}

const UserFilter = (props: Props) => {
  const [role, setRole] = useState<IUserRole[]>();
  const [country, setCountry] = useState<ICountry[]>();
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [filterValues, setFilterValues] = useState<IUserFilter>({
    keywords: '',
    membership: '',
    userTypes: '',
    status: '',
    country: '',
    state: '',
    address: '',
    phone: '',
    userActivity: '',
    dateRange: '',
  });
  const [open, setOpen] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserFilter>();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const fetchRole = useCallback(() => {
    fetch(API_PATHS.role, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('role:', data);
        setRole(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  return (
    <>
      <Box sx={{ marginTop: '5vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Search for users
        </Typography>
        <Collapse in={open} collapsedSize={81}>
          <Box sx={{ backgroundColor: '#323259', padding: '20px', border: '0.3px solid #000' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
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
              <Grid item xs={2.3}>
                <Select
                  labelId="membership-select-label"
                  id="membership-select"
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
                  //   value={status}
                  //   onChange={handleChange}
                >
                  <MenuItem>General</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={2.3}>
                <Select
                  color="secondary"
                  // onChange={(e) => {setRole(e.target.value)}}
                  sx={{
                    backgroundColor: '#252547',
                    color: '#fff',
                    width: '100%',
                    height: '40px',
                    '&: hover': {
                      backgroundColor: '#1b1b38',
                    },
                  }}
                  value={role}
                >
                  {/* {role &&
                    (Object.keys(role) as Array<keyof typeof role>).map((key, index) => {
                      <div className="" key={index}>
                        <Typography>{key}</Typography>
                        {role[key].map((item) => {
                          return (
                            <MenuItem key={item.id}>
                              <Checkbox />
                              <ListItemText primary={item.name} />
                            </MenuItem>
                          );
                        })}
                      </div>;
                    })} */}
                </Select>
              </Grid>

              <Grid item xs={2.3}>
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
                  //   value={status}
                  //   onChange={handleChange}
                >
                  {status.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item xs={1.1}>
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
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
                    Country
                  </Typography>
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    color="secondary"
                    sx={{
                      backgroundColor: '#252547',
                      color: '#fff',
                      width: '18vw',
                      height: '40px',
                      '&: hover': {
                        backgroundColor: '#1b1b38',
                      },
                    }}
                    //   value={status}
                    //   onChange={handleChange}
                  >
                    <MenuItem>US</MenuItem>
                  </Select>
                </Box>
                <Box sx={{ display: 'flex', marginTop: '1vh', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
                    State
                  </Typography>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="outlined-basic"
                        color="secondary"
                        className="state"
                        value={filterValues.state}
                        sx={{
                          backgroundColor: '#252547',
                          color: '#fff',
                          padding: '0 16px',
                          border: '1px solid #b18aff',
                          width: '18vw',
                          height: '40px',
                          '&: hover': {
                            backgroundColor: '#1b1b38',
                          },
                        }}
                        // onChange={(e) => setFilterValues({ ...filterValues, keywords: e.target.value })}
                      />
                    )}
                    name="state"
                    control={control}
                  />
                </Box>
                <Box sx={{ display: 'flex', marginTop: '1vh', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
                    Address
                  </Typography>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="outlined-basic"
                        color="secondary"
                        className="address"
                        value={filterValues.address}
                        sx={{
                          backgroundColor: '#252547',
                          color: '#fff',
                          padding: '0 16px',
                          border: '1px solid #b18aff',
                          width: '18vw',
                          height: '40px',
                          '&: hover': {
                            backgroundColor: '#1b1b38',
                          },
                        }}
                        // onChange={(e) => setFilterValues({ ...filterValues, keywords: e.target.value })}
                      />
                    )}
                    name="address"
                    control={control}
                  />
                </Box>
                <Box sx={{ display: 'flex', marginTop: '1vh', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
                    Phone
                  </Typography>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="outlined-basic"
                        color="secondary"
                        className="phone"
                        value={filterValues.phone}
                        sx={{
                          backgroundColor: '#252547',
                          color: '#fff',
                          padding: '0 16px',
                          border: '1px solid #b18aff',
                          width: '18vw',
                          height: '40px',
                          '&: hover': {
                            backgroundColor: '#1b1b38',
                          },
                        }}
                        // onChange={(e) => setFilterValues({ ...filterValues, keywords: e.target.value })}
                      />
                    )}
                    name="phone"
                    control={control}
                  />
                </Box>
              </Grid>
              <Grid item xs={1.5}>
                <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff', padding: '1vh 2vw' }}>
                  User activity
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <FormControlLabel
                    sx={{ color: '#fff' }}
                    control={<Checkbox sx={{ color: '#fff' }} />}
                    label="Register"
                  />
                  <FormControlLabel
                    sx={{ color: '#fff' }}
                    control={<Checkbox sx={{ color: '#fff' }} />}
                    label="Last logged in"
                  />
                </Box>
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateRangePicker
                    startText="Check-in"
                    endText="Check-out"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                </LocalizationProvider> */}
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

export default UserFilter;
