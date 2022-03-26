import { Box, Button, Grid, Input, Typography } from '@mui/material';
import React from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { IUserParams } from '../../../../models/user';
import { validEmailRegex } from '../../../../utils';
import { titleAuthForm } from '../../constant';
import { baseInputStyle } from '../../pages/AddUserPage';
import Access from './Access';
import Tax from './Tax';

interface Props {
  control: Control<IUserParams, any>;
}

const AuthForm = (props: Props) => {
  const {
    control,
    register,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserParams>({
    mode: 'onBlur',
  });

  const onSubmit = (data: IUserParams) => {
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                render={({ field }) => (
                  <Input
                    {...field}
                    id="firstName"
                    color="secondary"
                    autoComplete="off"
                    sx={[baseInputStyle, { marginTop: '2vh' }]}
                    {...register('firstName', {
                      required: true,
                    })}
                  />
                )}
              />
              {errors?.firstName?.type === 'required' && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  <FormattedMessage id="firstNameRequire" />
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="lastName"
                    color="secondary"
                    autoComplete="off"
                    sx={[baseInputStyle, { marginTop: '2vh' }]}
                    {...register('lastName', {
                      required: true,
                    })}
                  />
                )}
              />
              {errors?.lastName?.type === 'required' && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  <FormattedMessage id="lastNameRequire" />
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    color="secondary"
                    autoComplete="off"
                    sx={[baseInputStyle, { marginTop: '2vh' }]}
                    {...register('email', {
                      required: true,
                      pattern: validEmailRegex,
                    })}
                  />
                )}
              />
              {errors?.email?.type === 'required' && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  <FormattedMessage id="emailRequire" />
                </p>
              )}
              {errors?.email?.type === 'pattern' && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  <FormattedMessage id="emailInvalid" />
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: { value: true, message: 'This field is requierd' },
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
                  required: { value: true, message: 'This field is requierd' },
                  validate: { value: (value) => value === getValues('password') || 'The passwords do not match' },
                }}
                render={({ field: { onChange, ...props } }) => (
                  <Input
                    {...props}
                    id="confirmPassword"
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
                render={({ field }) => (
                  <select
                    {...field}
                    {...register('paymentRailsType', {
                      required: true,
                    })}
                    defaultValue={'Individual'}
                    style={baseInputStyle}
                  >
                    <option value="Individual" style={baseInputStyle}>
                      Individual
                    </option>
                    <option value="Business" style={baseInputStyle}>
                      Business
                    </option>
                  </select>
                )}
              />
              {errors?.paymentRailsType?.type === 'required' && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  <FormattedMessage id="typeRequire" />
                </p>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Access control={control} />
        <Tax control={control} />
      </Box>

      <Box
        sx={{
          backgroundColor: '#323259',
          margin: '0 5vh',
          padding: '3vh 5vh',
          boxShadow: '1px 1px 11px #b18aff',
          width: '75%',
          position: 'fixed',
          top: '88vh',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            display: 'flex',
            marginRight: '2vh',
            opacity: '0.5',
            backgroundColor: '#f0ad4e',
            '&: hover': {
              backgroundColor: '#f0ad4e',
              color: '#000',
            },
          }}
        >
          Add User
        </Button>
      </Box>
    </form>
  );
};

export default AuthForm;
