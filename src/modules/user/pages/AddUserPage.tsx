import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Box, Button, Link, Typography } from '@mui/material';
import React from 'react';
import AuthForm from '../components/form/AuthForm';
import Access from '../components/form/Access';
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

interface Props {}

const AddUserPage = (props: Props) => {
  return (
    <div style={{ flex: '1', backgroundColor: '#323259' }}>
      <Box sx={{ backgroundColor: '#1b1b38', padding: '0 5vh' }}>
        <Link id="productManager" href="http://localhost:3000/user/new-user" underline="none" sx={{ color: '#fff' }}>
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

        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Create profile
        </Typography>
        <AuthForm />
      </Box>
      <Access />
      <Tax />
    </div>
  );
};

export default AddUserPage;
