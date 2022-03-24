import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Button, Box } from '@mui/material';
import React from 'react';
import { Control } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IProductParams } from '../../../models/product';
import AddProductForm from '../components/form/AddProductForm';

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

interface Props {
  control: Control<IProductParams, any>;
}

const AddProductPage = (props: Props) => {
  const { control } = props;
  return (
    <div style={{ flex: '1', backgroundColor: '#323259' }}>
      <Box sx={{ backgroundColor: '#1b1b38', padding: '0 5vh' }}>
        <Link style={{ textDecoration: 'none' }} to="/products/manage-product">
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
      <AddProductForm control={control} />
    </div>
  );
};

export default AddProductPage;
