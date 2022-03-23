import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import { DateRange } from '@mui/lab/DateRangePicker';
import { Box, Button, Collapse, Grid, Input, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IUserFilter } from '../../../../models/filter';
import { selectBaseStyles } from '../../pages/AddUserPage';
import AddressDetail from './AddressDetail';
import MultiSelectMembership from './MultiSelectMembership';
import MultiSelectRole from './MultiSelectRole';
import UserActivity from './UserActivity';

const status = [
  { id: '0', name: 'Any status' },
  { id: '1', name: 'Enable' },
  { id: '2', name: 'Disable' },
  { id: '3', name: 'Unapproved vendor' },
];

interface Props {}

const UserFilter = (props: Props) => {
  const [filterValues, setFilterValues] = useState<IUserFilter>({
    keywords: '',
    membership: '',
    userTypes: '',
    status: '',
    address: [],
    userActivity: '',
    dateRange: '',
  });
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<IUserFilter>();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

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
                  control={control}
                  name="keywords"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="keywords"
                      color="secondary"
                      placeholder="Search keywords"
                      value={filterValues.keywords}
                      sx={selectBaseStyles}
                      onChange={(e) => setFilterValues({ ...filterValues, keywords: e.target.value })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2.3}>
                <MultiSelectMembership />
              </Grid>
              <Grid item xs={2.3}>
                <MultiSelectRole />
              </Grid>

              <Grid item xs={2.3}>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <select
                      {...field}
                      defaultValue={0}
                      style={selectBaseStyles}
                      onChange={(e) => setFilterValues({ ...filterValues, status: e.target.value })}
                    >
                      {status?.map((i) => {
                        return (
                          <option key={i.id} value={i.id}>
                            {i.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                />
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
                <AddressDetail />
              </Grid>
              <Grid item xs={8}>
                <UserActivity />
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
