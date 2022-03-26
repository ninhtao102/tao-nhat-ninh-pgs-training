import { Box, Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_HEADER, API_PATHS } from '../../../configs/api';
import { IProductFilter } from '../../../models/filter';
import { IProductItem } from '../../../models/product';
import { ISort } from '../../../models/utils';
import ProductFilter from '../components/filter/ProductFilter';
import ProductListFooter from '../components/table/ProductListFooter';
import ProductListTable from '../components/table/ProductListTable';

interface Props {}

const ProductListPage = (props: Props) => {
  const [filter, setFilter] = useState<IProductFilter>();
  const [sortInfo, setsortInfo] = useState<ISort>({
    order_by: 'name',
    sort: 'asc',
  });
  const [totalItem, setTotalItem] = useState();
  const [tableData, setTableData] = useState<IProductItem[]>();
  const [pageInfo, setPageInfo] = useState(1);
  const [checked, setChecked] = useState(false);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, number: number) => {
    setPageInfo(number);
  };

  const handleFilter = (data: IProductFilter) => {
    setFilter(data);
  };

  const handleCheckItem = (checked: any) => {
    setChecked(!checked);
    // tableData[index]
  };

  const handleSort = (id: string) => {
    const isSort = sortInfo?.order_by === id && sortInfo.sort === 'desc';
    setsortInfo({ sort: isSort ? 'asc' : 'desc', order_by: id });
  };

  const fetchData = useCallback(() => {
    fetch(API_PATHS.products, {
      method: 'post',
      ...API_HEADER,
      body: JSON.stringify({
        ...filter,
        order_by: sortInfo?.sort.toUpperCase(),
        page: pageInfo,
        sort: sortInfo?.order_by,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const newData = data.data.map((item: any) => {
          return { ...item, checked: false };
        });
        setTableData(newData);
        setTotalItem(data.recordsTotal);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [filter, pageInfo, sortInfo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#1b1b37',
          width: '100vw',
          padding: '5vh',
        }}
      >
        <ProductFilter handleFilter={handleFilter} />
        <Link style={{ textDecoration: 'none' }} to="/products/new-product">
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
        <ProductListTable
          tableData={tableData}
          sortInfo={sortInfo}
          totalItem={totalItem}
          pageInfo={pageInfo}
          handleSort={handleSort}
          handleCheckItem={handleCheckItem}
          handleChangePage={handleChangePage}
        />
        <Box sx={{ position: 'fixed', bottom: '3px', width: 'calc(100vw - 22vw)' }}>
          <ProductListFooter />
        </Box>
      </Box>
    </>
  );
};

export default ProductListPage;
