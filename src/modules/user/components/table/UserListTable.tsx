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
  TableSortLabel,
  Typography,
  Box,
} from '@mui/material';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { API_HEADER, API_PATHS } from '../../../../configs/api';
import { IUserItem } from '../../../../models/user';

const columns = [
  { id: 'login', headerName: 'Login/Email', canSort: true },
  { id: 'name', headerName: 'Name', canSort: true },
  { id: 'level', headerName: 'Access level', canSort: false },
  { id: 'products', headerName: 'Products', canSort: false },
  { id: 'orders', headerName: 'Orders', canSort: false },
  { id: 'wishlist', headerName: 'Wishlist', canSort: false },
  { id: 'created', headerName: 'Created', canSort: false },
  { id: 'last', headerName: 'Last Login', canSort: false },
  { id: 'btn', headerName: '', canSort: false },
];

interface Props {}

const UserListTable = (props: Props) => {
  const [rows, setRows] = useState<IUserItem[]>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalItem, setTotalItem] = useState();
  const [sortInfo, setsortInfo] = useState({
    order_by: 'name',
    sort: 'asc',
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (name: string) => {
    const isSort = sortInfo.order_by === name && sortInfo.sort === 'desc';
    setsortInfo({ sort: isSort ? ' asc' : 'desc', order_by: name });
  };

  const fetchData = useCallback(() => {
    fetch(API_PATHS.users, API_HEADER)
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

                {columns.map((col, i) => {
                  if (col.canSort) {
                    return (
                      <TableCell key={i} align="left" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
                        {col.headerName}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={i}
                        align="left"
                        // sortDirection={sort === col.id ? order_by : false}
                        sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}
                      >
                        <TableSortLabel
                          // active={sort === col.headerName}
                          // direction={sort === col.headerName ? order_by : 'asc'}
                          onClick={() => handleSort(col.headerName)}
                          sx={{ color: 'white' }}
                        >
                          <Typography sx={{ fontSize: '13px' }} noWrap>
                            {col.headerName}
                          </Typography>
                          {/* {sort === col.headerName ? ( */}
                          <Box
                            component="span"
                            // sx={visuallyHidden}
                          >
                            {/* {order_by === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
                          </Box>
                          {/* ) : null} */}
                        </TableSortLabel>
                      </TableCell>
                    );
                  }
                })}
                {/* {columns.map((col) => (
                  <TableCell key={col.field} align="left" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
                    {col.headerName}
                  </TableCell>
                ))} */}
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
                  <TableCell align="left" sx={{ minWidth: '20vh' }}>
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
                  <TableCell align="left" sx={{ color: '#fff', minWidth: '20vh' }}>
                    {moment(+item.created * 1000).format('lll')}
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff', minWidth: '20vh' }}>
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
