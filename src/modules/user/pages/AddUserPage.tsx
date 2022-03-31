import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Box, Button, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { API_HEADER, API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { IUserParams } from '../../../models/user';
import Access from '../components/form/Access';
import AuthForm from '../components/form/AuthForm';
import Tax from '../components/form/Tax';

export const baseInputStyle = {
  backgroundColor: '#252547',
  color: '#fff',
  padding: '0 16px',
  border: '0.1px solid #111',
  width: '70%',
  height: '40px',
  '&: hover': {
    backgroundColor: '#1b1b38',
  },
};

export const selectBaseStyles = {
  backgroundColor: '#252547',
  color: '#fff',
  width: '100%',
  height: '40px',
  padding: '0 12px',
  border: '1px solid #000',
  borderRadius: '5px',
};

const AddUserPage = () => {
  const {
    control,
    trigger,
    watch,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserParams>({
    mode: 'onChange',
  });

  const onSubmit = useCallback((data: IUserParams) => {
    console.log('🚀 ~ file: AddUserPage.tsx ~ line 41 ~ onSubmit ~ data', data);

    fetch(API_PATHS.usersCreate, {
      method: 'post',
      ...API_HEADER,
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Create User Success:', result);
        alert('Create user success');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div style={{ flex: '1', backgroundColor: '#323259' }}>
      <Box sx={{ backgroundColor: '#1b1b38' }}>
        <Link style={{ textDecoration: 'none', margin: '5vh' }} to={`${ROUTES.userList}`}>
          <Button
            variant="contained"
            sx={{
              height: '5vh',
              margin: '10vh 0 2vh 0',
              backgroundColor: '#fff',
              color: '#000',
              '&:hover': { backgroundColor: '#fff' },
            }}
          >
            <KeyboardBackspaceRoundedIcon />
          </Button>
        </Link>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ color: '#fff', margin: '2vh 5vh', fontWeight: 'bold' }}
          >
            Create profile
          </Typography>
          <Box sx={{ backgroundColor: '#323259' }}>
            <AuthForm
              control={control}
              trigger={trigger}
              watch={watch}
              getValues={getValues}
              errors={errors}
              isDetail={false}
            />
            <Access control={control} watch={watch} errors={errors} isDetail={false} />
            <Tax control={control} />
          </Box>

          <div
            style={{
              backgroundColor: '#323259',
              margin: '0 5vh',
              padding: '3vh 5vh',
              boxShadow: '1px 1px 11px #b18aff',
              width: '74%',
              position: 'fixed',
              top: '88vh',
            }}
          >
            <Button
              variant="contained"
              disabled={!isValid}
              type="submit"
              sx={{
                display: 'flex',
                width: '180px',
                backgroundColor: '#f0ad4e',
                '&: hover': {
                  backgroundColor: '#f0ad4e',
                  color: '#000',
                },
              }}
            >
              Create User
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default AddUserPage;
