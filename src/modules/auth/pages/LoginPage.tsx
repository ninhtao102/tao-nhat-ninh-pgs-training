import { Paper, Typography } from '@mui/material';
import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { ILoginParams } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { fetchThunk } from '../../common/redux/thunk';
import LoginForm from '../components/LoginForm';
import { setUserInfo } from '../redux/authReducer';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const onLogin = useCallback(
    async (value: ILoginParams) => {
      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: value.email, password: value.password }),
      );

      if (json?.success) {
        dispatch(setUserInfo(json.user)); //dispatch action set user data
        //Set login token to Cookie when user choose remember me
        Cookies.set(ACCESS_TOKEN_KEY, json.user_cookie, { expires: value.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.productList));
        return;
      }
    },
    [dispatch],
  );

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={10} sx={{ padding: '15vh 5vh', width: '25%' }}>
        <Typography variant="h3" gutterBottom component="div" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Welcome back
        </Typography>
        <Typography variant="h6" gutterBottom component="div" sx={{ color: '#C4C4C4' }}>
          Enter your email and password to sign in
        </Typography>
        <LoginForm onLogin={onLogin} />
      </Paper>
    </div>
  );
};

export default LoginPage;
