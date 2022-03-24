import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import ProductFilter from '../components/filter/ProductFilter';
import ProductListFooter from '../components/table/ProductListFooter';
import ProductListTable from '../components/table/ProductListTable';
import { IProductFilter } from '../../../models/product';
import { Link } from 'react-router-dom';

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
        <Link style={{ textDecoration: 'none' }} to="/products/manage-product">
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
            Add Product
          </Button>
        </Link>
        <ProductListTable />
        <Box sx={{ position: 'fixed', bottom: '3px', width: 'calc(100vw - 22vw)' }}>
          <ProductListFooter />
        </Box>
      </Box>
    </>
  );
};

export default ProductListPage;
