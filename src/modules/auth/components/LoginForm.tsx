import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Paper, Switch, TextField, Typography, Checkbox } from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { validEmailRegex } from '../../../utils';

interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Props {}

const LoginForm = (props: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginParams>();

  const onSubmit = handleSubmit((data: ILoginParams) => {
    console.log(data);
  });

  return (
    <div>
      <Paper
        elevation={10}
        sx={{ margin: '10vh auto', padding: '15vh 5vh', display: 'flex', flexDirection: 'column', width: '25%' }}
      >
        <Typography variant="h3" gutterBottom component="div" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Welcome back
        </Typography>
        <Typography variant="h6" gutterBottom component="div" sx={{ color: '#C4C4C4' }}>
          Enter your email and password to sign in
        </Typography>
        <form action="">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-basic"
                className="email"
                label="Email"
                variant="outlined"
                sx={{ borderRadius: '12px', margin: '5px 0' }}
                {...register('email', {
                  required: true,
                  pattern: validEmailRegex,
                })}
              />
            )}
            name="email"
            control={control}
            defaultValue=""
          />
          {errors?.email?.type === 'required' && (
            <p style={{ color: 'red' }}>
              <FormattedMessage id="emailRequire" />
            </p>
          )}
          {errors?.email?.type === 'pattern' && (
            <p style={{ color: 'red' }}>
              <FormattedMessage id="emailInvalid" />
            </p>
          )}
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-basic"
                className="password"
                label="Password"
                variant="outlined"
                sx={{ borderRadius: '12px', margin: '5px 0' }}
                {...register('password', {
                  required: true,
                  minLength: 6,
                })}
              />
            )}
            name="password"
            control={control}
            defaultValue=""
          />
          {errors?.password?.type === 'required' && (
            <p style={{ color: 'red' }}>
              <FormattedMessage id="passwordRequire" />
            </p>
          )}
          {errors?.password?.type === 'minLength' && (
            <p style={{ color: 'red' }}>
              <FormattedMessage id="minPasswordInvalid" />
            </p>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Controller name="rememberMe" control={control} render={({ field }) => <Checkbox {...field} />} />
            <Typography variant="subtitle1" display="block" sx={{ alignSelf: 'center' }}>
              Remember Me
            </Typography>
          </Box>
          <Button variant="contained" sx={{ margin: '5px 0', height: '46px', borderRadius: '8px' }} onClick={onSubmit}>
            <FormattedMessage id="signIn" />
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginForm;
