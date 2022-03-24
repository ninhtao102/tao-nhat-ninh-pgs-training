import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import { Box, Button, Collapse, Grid, Input, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IUserFilter } from '../../../../models/filter';
import { userStatus } from '../../constant';
import { selectBaseStyles } from '../../pages/AddUserPage';
import AddressDetail from './AddressDetail';
import MultiSelectMembership from './MultiSelectMembership';
import MultiSelectRole from './MultiSelectRole';
import UserActivity from './UserActivity';

interface Props {
  handleFilter: (data: IUserFilter) => void;
}

const UserFilter = (props: Props) => {
  const { handleFilter } = props;
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<IUserFilter>();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const onSubmit = (data: IUserFilter) => {
    console.log('data', data);
    handleFilter(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                  name="search"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="keywords"
                      color="secondary"
                      placeholder="Search keywords"
                      sx={selectBaseStyles}
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
                    <select {...field} defaultValue={''} style={selectBaseStyles}>
                      {userStatus?.map((i) => {
                        return (
                          <option key={i.id} value={i.value}>
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
              <Grid item xs={4}>
                <AddressDetail control={control} />
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
    </form>
  );
};

export default UserFilter;
