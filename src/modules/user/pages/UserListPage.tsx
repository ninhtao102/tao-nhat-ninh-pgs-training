import { Box, Button, Link } from '@mui/material';
import React from 'react';
import UserFilter from '../components/filter/UserFilter';
import UserFooter from '../components/table/UserFooter';
import UserListTable from '../components/table/UserListTable';

interface Props {}

const UserListPage = (props: Props) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#1b1b37',
          width: '100vw',
          padding: '5vh',
        }}
      >
        <UserFilter />
        <Button
          variant="contained"
          sx={{
            margin: '1vh 0 4vh 0',
            backgroundColor: '#b18aff',
            '&:hover ': {
              backgroundColor: '#b18aff',
              color: '#000',
            },
            '&:hover #newProductLink': {
              backgroundColor: '#b18aff',
              color: '#000',
            },
          }}
        >
          <Link id="newProductLink" href="http://localhost:3000/user/new-user" underline="none" sx={{ color: '#fff' }}>
            Add User
          </Link>
        </Button>
        <UserListTable />
        <Box sx={{ position: 'fixed', bottom: '3px', width: 'calc(100vw - 22vw)' }}>
          <UserFooter />
        </Box>
      </Box>
    </>
  );
};

export default UserListPage;
