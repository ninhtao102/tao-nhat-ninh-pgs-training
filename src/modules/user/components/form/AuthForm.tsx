import { Box, Grid, Input, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IAuth } from '../../../../models/form';
import { baseInputStyle } from '../../pages/AddUserPage';

const titleRowForm = [
  { title: 'First Name', require: true },
  { title: 'Last Name', require: true },
  { title: 'Email', require: true },
  { title: 'Password', require: true },
  { title: 'Confirm password', require: true },
  { title: 'Type', require: true },
  { title: 'PaymentRails ID', require: false },
];

interface Props {}

const AuthForm = (props: Props) => {
  const [formValues, setFormValues] = useState<IAuth>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: '',
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>();

  return (
    <form>
      <Box>
        <Typography variant="h6" gutterBottom component="div" sx={{ color: '#fff' }}>
          Email &amp; password
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
                <Input
                  {...field}
                  id="firstName"
                  color="secondary"
                  className="firstName"
                  value={formValues.firstName}
                  sx={[baseInputStyle, { marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
                />
              )}
              name="firstName"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="lastName"
                  color="secondary"
                  className="lastName"
                  value={formValues.lastName}
                  sx={[baseInputStyle, { marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
                />
              )}
              name="lastName"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  color="secondary"
                  className="email"
                  value={formValues.email}
                  sx={[baseInputStyle, { marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                />
              )}
              name="email"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  color="secondary"
                  className="password"
                  value={formValues.password}
                  sx={[baseInputStyle, { marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                />
              )}
              name="password"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="confirmPassword"
                  color="secondary"
                  className="confirmPassword"
                  value={formValues.confirmPassword}
                  sx={[baseInputStyle, { marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
                />
              )}
              name="confirmPassword"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="type-select-label"
                  id="type-select"
                  color="secondary"
                  value={formValues.type}
                  sx={[baseInputStyle, { marginTop: '2vh' }]}
                  onChange={(e) => setFormValues({ ...formValues, type: e.target.value })}
                >
                  <MenuItem value={formValues.type}>Individual</MenuItem>
                  <MenuItem value={formValues.type}>Business</MenuItem>
                </Select>
              )}
              name="type"
              control={control}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default AuthForm;
