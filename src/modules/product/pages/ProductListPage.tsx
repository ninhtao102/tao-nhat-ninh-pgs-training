import { Box, Button } from '@mui/material';
import React from 'react';
import ProductFilter from '../components/ProductFilter';
import ProductListFooter from '../components/ProductListFooter';
import ProductListTable from '../components/ProductListTable';

interface Props {}

const ProductListPage = (props: Props) => {
  return (
    <>
      <Box sx={{ backgroundColor: '#1b1b37', width: '100%', padding: '5vh', paddingBottom: '0px' }}>
        <ProductFilter />
        <Button
          variant="contained"
          sx={{
            margin: '5vh 0',
            backgroundColor: '#b18aff',
            '&: hover': {
              backgroundColor: '#b18aff',
              color: '#000',
            },
          }}
        >
          Add Product
        </Button>
        <ProductListTable />
        <ProductListFooter />
      </Box>
    </>
  );
};

export default ProductListPage;
