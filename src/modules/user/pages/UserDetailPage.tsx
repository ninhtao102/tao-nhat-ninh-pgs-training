import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { API_HEADER, API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { IUserParams } from '../../../models/user';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { useForm } from 'react-hook-form';
import ExtenInfo from '../components/detail/ExtenInfo';
import Tax from '../components/form/Tax';
import AuthForm from '../components/form/AuthForm';
import Access from '../components/form/Access';

const UserDetailPage = () => {
  const { id } = useParams() as {
    id: string;
  };
  const [dataDetail, setdataDetail] = useState<IUserParams>();
  const [accountStatus, setAccountStatus] = useState();

  const {
    control,
    watch,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserParams>({
    mode: 'onChange',
    defaultValues: dataDetail,
  });

  const fetchUserDetail = useCallback(() => {
    fetch(API_PATHS.userDetail, {
      method: 'post',
      ...API_HEADER,
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAccountStatus(data.data?.account_status);
        setdataDetail(data.data?.info);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  const onSubmit = useCallback((data: IUserParams) => {
    console.log('🚀 ~ file: UserDetailPage.tsx ~ line 51 ~ onSubmit ~ data', data);

    // fetch(API_PATHS.usersEdit, {
    //   method: 'post',
    //   ...API_HEADER,
    //   body: JSON.stringify({
    //     // params edit user
    //     ...data,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log('Update User Success:', result);
    //     alert('Update user success');
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  }, []);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  return (
    <>
      <Box sx={{ flex: '1', backgroundColor: '#323259' }}>
        <Box sx={{ backgroundColor: '#1b1b38', padding: '80px 0 10px 5vh' }}>
          <Link style={{ textDecoration: 'none' }} to={`${ROUTES.userList}`}>
            <Button
              variant="contained"
              sx={{
                height: '5vh',
                backgroundColor: '#fff',
                color: '#000',
                '&:hover': { backgroundColor: '#fff' },
              }}
            >
              <KeyboardBackspaceRoundedIcon />
            </Button>
          </Link>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ backgroundColor: '#1b1b38' }}>
            <Typography variant="h5" sx={{ color: 'white', margin: '0 5vh' }}>
              {`${dataDetail?.email} (${dataDetail?.companyName || ''})`}
            </Typography>
          </Box>

          <Box>
            {dataDetail && <ExtenInfo dataDetail={dataDetail} />}
            <Box sx={{ marginTop: '2vh', paddingTop: '5vh', backgroundColor: '#1b1b38' }}>
              <AuthForm
                control={control}
                trigger={trigger}
                watch={watch}
                getValues={getValues}
                errors={errors}
                isDetail={true}
              />
            </Box>
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
              disabled={!isValid}
              type="submit"
              variant="contained"
              sx={{
                width: '150px',
                backgroundColor: '#f0ad4e',
                '&: hover': {
                  backgroundColor: '#f0ad4e',
                  color: '#000',
                },
              }}
            >
              Update
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default UserDetailPage;
