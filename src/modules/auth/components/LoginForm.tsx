import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { validEmailRegex } from '../../../utils';

interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Props {
  onLogin(value: ILoginParams): void;
}

const LoginForm = (props: Props) => {
  const { onLogin } = props;
  const [formValues, setFormValues] = useState<ILoginParams>({ email: '', password: '', rememberMe: false });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginParams>();

  const onSubmit = useCallback(
    (data: ILoginParams) => {
      console.log(data);
      onLogin(formValues);
    },
    [formValues, onLogin],
  );

  return (
    <form action="">
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            className="email"
            label="Email"
            value={formValues.email}
            variant="outlined"
            sx={{ margin: '5px 0', width: '100%' }}
            {...register('email', {
              required: true,
              pattern: validEmailRegex,
            })}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
          />
        )}
        name="email"
        control={control}
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
            type="password"
            value={formValues.password}
            variant="outlined"
            sx={{ margin: '5px 0', width: '100%' }}
            {...register('password', {
              required: true,
              minLength: 6,
            })}
            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
          />
        )}
        name="password"
        control={control}
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
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              checked={formValues.rememberMe}
              onChange={(e) => setFormValues({ ...formValues, rememberMe: !!e.target.checked })}
            />
          )}
        />
        <Typography variant="subtitle1" display="block" sx={{ alignSelf: 'center' }}>
          Remember Me
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ margin: '5px 0', width: '100%', height: '48px', borderRadius: '8px' }}
        onClick={handleSubmit(onSubmit)}
      >
        <FormattedMessage id="signIn" />
      </Button>
    </form>
  );
};

export default LoginForm;
