import { Box, Grid, Input, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { IAuth } from '../../../../models/form';
import { validEmailRegex } from '../../../../utils';
import { baseInputStyle } from '../../pages/AddUserPage';
import { titleAuthForm } from '../../constant';

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
  } = useForm<IAuth>({
    mode: 'onBlur',
  });

  return (
    <form>
      <Box sx={{ paddingBottom: '5vh' }}>
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
                    value={formValues.firstName}
                    sx={[baseInputStyle, { marginTop: '2vh' }]}
                    {...register('firstName', {
                      required: true,
                    })}
                    onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
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
                    value={formValues.lastName}
                    sx={[baseInputStyle, { marginTop: '2vh' }]}
                    {...register('lastName', {
                      required: true,
                    })}
                    onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
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
                    value={formValues.email}
                    sx={[baseInputStyle, { marginTop: '2vh' }]}
                    {...register('email', {
                      required: true,
                      pattern: validEmailRegex,
                    })}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
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
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    color="secondary"
                    autoComplete="off"
                    type="password"
                    value={formValues.password}
                    sx={[baseInputStyle, { marginTop: '2vh' }]}
                    {...register('password', {
                      required: true,
                      minLength: 6,
                    })}
                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                  />
                )}
              />
              {errors?.password?.type === 'required' && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  <FormattedMessage id="passwordRequire" />
                </p>
              )}
              {errors?.password?.type === 'minLength' && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  <FormattedMessage id="minPasswordInvalid" />
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="confirmPassword"
                    color="secondary"
                    autoComplete="off"
                    type="password"
                    value={formValues.confirmPassword}
                    sx={[baseInputStyle, { margin: '2vh 0' }]}
                    {...register('confirmPassword', {
                      required: true,
                    })}
                    onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
                  />
                )}
              />
              {errors?.confirmPassword?.type === 'required' && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  <FormattedMessage id="confirmPasswordRequire" />
                </p>
              )}
              {errors?.confirmPassword?.type === 'matchPassword' && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  <FormattedMessage id="matchPasswordInvalid" />
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <select
                    {...field}
                    {...register('type', {
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
              {errors?.type?.type === 'required' && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  <FormattedMessage id="typeRequire" />
                </p>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default AuthForm;
