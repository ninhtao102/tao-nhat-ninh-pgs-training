import { Box, Grid, Input, Typography } from '@mui/material';
import React from 'react';
import { Control, Controller, UseFormGetValues, UseFormWatch } from 'react-hook-form';
import { IUserParams } from '../../../../models/user';
import { validEmailRegex } from '../../../../utils';
import { titleAuthForm } from '../../constant';
import { baseInputStyle } from '../../pages/AddUserPage';

interface Props {
  control: Control<IUserParams, any>;
  trigger: any;
  errors?: any;
  watch: UseFormWatch<IUserParams>;
  getValues: UseFormGetValues<IUserParams>;
  isDetail?: boolean;
}

const AuthForm = (props: Props) => {
  const { control, trigger, errors, watch, getValues, isDetail } = props;
  const required = { required: { value: true, message: 'This field is requierd' } };

  return (
    <>
      <Box sx={{ backgroundColor: '#1b1b38', padding: '0 5vh 5vh 5vh' }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ color: '#fff' }}>
          Email &amp; password
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            {titleAuthForm.map((title, i) => {
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

          <Grid item xs={6}>
            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="firstName"
                rules={required}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="firstName"
                    color="secondary"
                    autoComplete="off"
                    sx={[baseInputStyle, { marginTop: '2vh' }]}
                  />
                )}
              />
              {errors?.firstName?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.firstName?.message}
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="lastName"
                rules={required}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="lastName"
                    color="secondary"
                    autoComplete="off"
                    sx={[baseInputStyle, { marginTop: '2vh' }]}
                  />
                )}
              />
              {errors?.lastName?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.lastName?.message}
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="email"
                rules={{
                  ...required,
                  pattern: { value: validEmailRegex, message: 'Email is invalid' },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    color="secondary"
                    autoComplete="off"
                    sx={[baseInputStyle, { marginTop: '2vh' }]}
                  />
                )}
              />
              {errors?.email?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.email?.message}
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="password"
                rules={{
                  ...required,
                  minLength: { value: 6, message: 'Password must have at least 6 characters' },
                }}
                render={({ field: { onChange } }) => (
                  <Input
                    id="password"
                    color="secondary"
                    type="password"
                    sx={[baseInputStyle, { marginTop: '2vh' }]}
                    onChange={(e) => {
                      onChange(e);
                      trigger(['confirm_password', 'password']);
                    }}
                  />
                )}
              />
              {errors?.password?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.password?.message}
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="confirm_password"
                rules={{
                  ...required,
                  validate: { value: (value) => value === getValues('password') || 'The passwords do not match' },
                }}
                render={({ field: { onChange, ...props } }) => (
                  <Input
                    {...props}
                    id="confirm_password"
                    color="secondary"
                    type="password"
                    onChange={(e) => {
                      onChange(e);
                      trigger(['confirm_password', 'password']);
                    }}
                    sx={[baseInputStyle, { margin: '2vh 0' }]}
                  />
                )}
              />
              {errors?.confirm_password?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.confirm_password?.message}
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="paymentRailsType"
                rules={required}
                render={({ field }) => (
                  <select {...field} defaultValue={'Individual'} style={baseInputStyle}>
                    <option value="Individual" style={baseInputStyle}>
                      Individual
                    </option>
                    <option value="Business" style={baseInputStyle}>
                      Business
                    </option>
                  </select>
                )}
              />
              {errors?.paymentRailsType?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.paymentRailsType?.message}
                </p>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AuthForm;
