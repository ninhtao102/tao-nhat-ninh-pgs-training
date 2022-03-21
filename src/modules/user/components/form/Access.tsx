import { Box, Checkbox, Grid, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IAccess } from '../../../../models/form';
import { baseInputStyle } from '../../pages/AddUserPage';

const titleRowForm = [
  { title: 'Access level', require: true },
  { title: 'Membership', require: false },
  { title: 'Require to change password on next log in', require: false },
];

interface Props {}

const Access = (props: Props) => {
  const [formValues, setFormValues] = useState<IAccess>({
    accessLevel: '',
    memberShip: '',
    require: '',
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAccess>();

  return (
    <form>
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '2vh 5vh' }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ color: '#fff' }}>
          Access information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            {titleRowForm.map((title, i) => {
              return (
                <Box key={i} sx={{ display: 'flex', paddingTop: '2.8vh' }}>
                  <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff', textAlign: 'end' }}>
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
                <Select
                  {...field}
                  labelId="access-level-select-label"
                  id="access-level-select"
                  color="secondary"
                  value={formValues.accessLevel}
                  sx={[baseInputStyle, { marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, accessLevel: e.target.value })}
                >
                  <MenuItem value={formValues.accessLevel}>Vendor</MenuItem>
                  <MenuItem value={formValues.accessLevel}>Admin</MenuItem>
                </Select>
              )}
              name="accessLevel"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="access-level-select-label"
                  id="access-level-select"
                  color="secondary"
                  value={formValues.accessLevel}
                  sx={[baseInputStyle, { marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, accessLevel: e.target.value })}
                >
                  <MenuItem value={formValues.accessLevel}>Ignore Membership</MenuItem>
                  <MenuItem value={formValues.accessLevel}>General</MenuItem>
                </Select>
              )}
              name="accessLevel"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Checkbox
                  {...field}
                  id="require-checkbox"
                  sx={{ color: '#fff', margin: '2vh 0' }}
                  //   onChange={(e) => setFormValues({ ...formValues, require: e.target.checked })}
                />
              )}
              name="accessLevel"
              control={control}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Access;
