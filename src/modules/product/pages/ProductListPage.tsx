import { Box, Button, Link } from '@mui/material';
import React, { useState } from 'react';
import ProductFilter from '../components/ProductFilter';
import ProductListFooter from '../components/ProductListFooter';
import ProductListTable from '../components/ProductListTable';
import { IProductFilter } from '../../../models/product';

interface Props {}

const ProductListPage = (props: Props) => {
  const [filterValue, setFilterValue] = useState<IProductFilter>();
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#1b1b37',
          width: '100vw',
          padding: '5vh',
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
        <Box sx={{ position: 'fixed', bottom: '3px', width: 'calc(100vw - 22vw)' }}>
          <ProductListFooter />
        </Box>
      </Box>
    </>
  );
};

export default ProductListPage;
