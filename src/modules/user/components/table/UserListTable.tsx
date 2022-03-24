import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Checkbox,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IUserItem } from '../../../../models/user';
import { ISort } from '../../../../models/utils';
import { columns } from '../../constant';

interface Props {
  tableData: IUserItem[];
  sortInfo: ISort;
  totalItem: number;
  pageInfo: number;
  handleSort: (id: string) => void;
  handleCheckItem: (checked: any) => void;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, number: number) => void;
}

const UserListTable = (props: Props) => {
  const { tableData, sortInfo, totalItem, pageInfo, handleSort, handleCheckItem, handleChangePage } = props;
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    // setPage(0);
  };

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
                  <Checkbox
                    size="small"
                    sx={{ color: '#fff' }}
                    onChange={(e) => {
                      // handleCheckItem(index);
                      console.log('checkedAll', e);
                    }}
                  />
                </TableCell>

                {columns.map((col) => {
                  if (!col.canSort) {
                    return (
                      <TableCell
                        key={col.headerName}
                        align="left"
                        sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}
                      >
                        {col.headerName}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={col.headerName}
                        align="left"
                        sortDirection={sortInfo?.sort === col.headerName ? sortInfo?.sort : false}
                        sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}
                      >
                        <TableSortLabel
                          active={sortInfo?.sort === col.id}
                          onClick={() => handleSort(col.id)}
                          sx={{
                            color: 'white',
                            '&: hover': {
                              color: '#b18aff',
                            },
                          }}
                          direction={
                            sortInfo?.sort === col.id ? (sortInfo?.order_by as 'desc' | 'asc' | undefined) : 'asc'
                          }
                        >
                          <Typography sx={{ fontSize: '13px' }} noWrap>
                            {col.headerName}
                          </Typography>
                          {sortInfo?.sort === col.id ? (
                            <Box component="span" sx={{}}>
                              {sortInfo?.order_by === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.slice(pageInfo * rowsPerPage, pageInfo * rowsPerPage + rowsPerPage).map((item, index) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">
                    <Checkbox
                      size="small"
                      sx={{ color: '#fff' }}
                      onChange={(e) => {
                        // handleCheckItem(index);
                        console.log('checked', e);
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff' }}>
                    <Link className="detailLink" style={{ textDecoration: 'none' }} to="/user/user-detail/{user.id}">
                      {item.vendor}
                    </Link>
                    <br />
                    {item?.storeName}
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: '20vh' }}>
                    <Link className="detailLink" style={{ textDecoration: 'none' }} to="/user/user-detail/{user.id}">
                      {item.fistName} {item.lastName}
                    </Link>
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff', minWidth: '15vh' }}>
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
          page={pageInfo}
          showFirstButton={true}
          showLastButton={true}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: '#323259',
            color: '#fff',
          }}
        />
        {/* <Pagination page={1} count={totalItem} variant="outlined" shape="rounded" /> */}
      </Paper>
    </>
  );
};

export default UserListTable;
