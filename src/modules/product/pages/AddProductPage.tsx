import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Button, Link, Box } from '@mui/material';
import React from 'react';
import AddProductForm from '../components/form/AddProductForm';

interface Props {}

const AddProductPage = (props: Props) => {
  return (
    <div style={{ flex: '1', backgroundColor: '#323259' }}>
      <Box sx={{ backgroundColor: '#1b1b38', padding: '0 5vh' }}>
        <Link
          id="productManager"
          href="http://localhost:3000/products/manager-product"
          underline="none"
          sx={{ color: '#fff' }}
        >
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
      </Box>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
