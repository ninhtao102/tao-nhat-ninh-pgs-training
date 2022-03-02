import DeleteIcon from '@mui/icons-material/Delete';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import { Box, Checkbox, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { API_PATHS } from '../../../configs/api';
import { ITableItem } from '../../../models/table';

interface Props {}

const ProductListTable = (props: Props) => {
  const [item, setItem] = useState<ITableItem[]>();

  const fetchData = useCallback(() => {
    fetch(API_PATHS.productList)
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setItem(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <TableContainer component={Paper}>
        <TableContainer sx={{ minWidth: 650, backgroundColor: '#323259' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ color: '#fff' }}>
                <Checkbox size="small" sx={{ color: '#fff' }} />
              </TableCell>
              <TableCell align="left" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
                SKU
              </TableCell>
              <TableCell align="left" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
                Name
              </TableCell>
              <TableCell align="left" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
                Category
              </TableCell>
              <TableCell align="left" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
                Price
              </TableCell>
              <TableCell align="left" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
                In stock
              </TableCell>
              <TableCell align="left" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
                Vendor
              </TableCell>
              <TableCell align="left" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
                Arrival Date
              </TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item?.map((item) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left" sx={{ color: '#fff' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Checkbox size="small" sx={{ color: '#fff' }} />
                    <PowerSettingsNewRoundedIcon
                      fontSize="medium"
                      sx={{
                        color: '#2dc653',
                        padding: '6px',
                        alignSelf: 'center',
                        borderLeft: '0.5px solid #fff',
                        borderRight: '0.5px dashed #fff',
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell align="left" sx={{ color: '#fff', width: '80px' }}>
                  {item.sku}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: '#00b4d8',
                    maxWidth: '325px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  {item.name}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: '#fff', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  {item.category}
                </TableCell>
                <TableCell align="left" sx={{ color: '#fff' }}>
                  ${(+item.price).toFixed(2)}
                </TableCell>
                <TableCell align="left" sx={{ color: '#fff', minWidth: '80px' }}>
                  {item.amount}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: '#00b4d8',
                    maxWidth: '210px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.vendor}
                </TableCell>
                <TableCell align="left" sx={{ color: '#fff', minWidth: '100px' }}>
                  {moment(+item.arrivalDate * 1000).format('ll')}
                </TableCell>
                <TableCell align="left" sx={{ color: '#fff' }}>
                  <DeleteIcon
                    fontSize="small"
                    sx={{ backgroundColor: '#b18aff', padding: '8px', borderRadius: '5px' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </TableContainer>
    </>
  );
};

export default ProductListTable;
