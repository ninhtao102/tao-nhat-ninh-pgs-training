import { Box, Button, Link } from '@mui/material';
import React from 'react';
import ProductFilter from '../components/ProductFilter';
import ProductListFooter from '../components/ProductListFooter';
import ProductListTable from '../components/ProductListTable';

interface Props {}

const ProductListPage = (props: Props) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#1b1b37',
          width: '100vw',
          padding: '5vh',
          // paddingBottom: '0px',
        }}
      >
        <ProductFilter />
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
          <Link
            id="newProductLink"
            href="http://localhost:3000/products/new-product"
            underline="none"
            sx={{ color: '#fff' }}
          >
            Add Product
          </Link>
        </Button>
        <ProductListTable />
        <Box sx={{ position: 'fixed', bottom: '3px', width: 'calc(100vw - 340px)' }}>
          <ProductListFooter />
        </Box>
      </Box>
    </>
  );
};

export default ProductListPage;
