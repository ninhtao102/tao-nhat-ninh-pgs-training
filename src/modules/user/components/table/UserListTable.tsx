import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Checkbox,
  Link,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import Cookies from 'js-cookie';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { API_PATHS } from '../../../../configs/api';
import { IUserItem } from '../../../../models/user';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';

const columns = [
  { field: 'id', headerName: 'Login/Email' },
  { field: 'id', headerName: 'Name' },
  { field: 'id', headerName: 'Access level' },
  { field: 'id', headerName: 'Products' },
  { field: 'id', headerName: 'Orders' },
  { field: 'id', headerName: 'Wishlist' },
  { field: 'id', headerName: 'Created' },
  { field: 'id', headerName: 'Last Login' },
  { field: 'id', headerName: '' },
];

interface Props {}

const UserListTable = (props: Props) => {
  const [rows, setRows] = useState<IUserItem[]>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalItem, setTotalItem] = useState();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = useCallback(() => {
    fetch(API_PATHS.users, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRows(data.data);
        setTotalItem(data.recordsTotal);
        console.log(data);
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
      <Paper
        sx={{
          marginBottom: '12vh',
          overflow: 'hidden',
          width: 'calc(100vw - 22vw)',
          // width: '100%',
        }}
      >
        <TableContainer component={Paper}>
          <TableContainer
            sx={{
              backgroundColor: '#323259',
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox size="small" sx={{ color: '#fff' }} />
                </TableCell>
                {columns.map((col) => (
                  <TableCell key={col.field} align="left" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
                    {col.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">
                    <Checkbox size="small" sx={{ color: '#fff' }} />
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff' }}>
                    <Link href="#" underline="hover">
                      {item.vendor}
                    </Link>
                    <br />
                    {item?.storeName}
                  </TableCell>
                  <TableCell align="left">
                    <Link href="#" underline="hover">
                      {item.fistName} {item.lastName}
                    </Link>
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff' }}>
                    {item.access_level}
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff' }}>
                    {item.product}
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff' }}>
                    {item.order.order_as_buyer}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      color: '#fff',
                    }}
                  >
                    {item.wishlist}
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff' }}>
                    {moment(+item.created * 1000).format('lll')}
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff' }}>
                    {moment(+item.last_login * 1000).format('lll')}
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff' }}>
                    <Button>
                      <DeleteIcon
                        fontSize="small"
                        sx={{
                          backgroundColor: '#b18aff',
                          color: '#fff',
                          padding: '8px',
                          borderRadius: '5px',
                          '&:hover': {
                            color: '#000',
                          },
                        }}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 75, 100]}
          component="div"
          count={totalItem ? +totalItem : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          showFirstButton={true}
          showLastButton={true}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: '#323259',
            color: '#fff',
          }}
        />
      </Paper>
    </>
  );
};

export default UserListTable;
