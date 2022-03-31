import DeleteIcon from '@mui/icons-material/Delete';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import {
  Box,
  Button,
  Checkbox,
  Modal,
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
import { ROUTES } from '../../../../configs/routes';
import { IProductItem } from '../../../../models/product';
import { ISort } from '../../../../models/utils';
import { columns } from '../../constant';
import ModalUpdate from '../table/ModalUpdate';

interface Props {
  tableData: IProductItem[] | undefined;
  sortInfo: ISort;
  // totalItem: number;
  totalItem: undefined;
  pageInfo: number;
  handleSort: (id: string) => void;
  handleCheckAll: (check: boolean) => void;
  handleCheckItem: (id: string) => void;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, number: number) => void;
}

const ProductListTable = (props: Props) => {
  const { tableData, sortInfo, totalItem, pageInfo, handleSort, handleCheckAll, handleCheckItem, handleChangePage } =
    props;

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModalUpdate, setOpenModalUpdate] = React.useState(false);

  const handleOpenModalUpdate = () => setOpenModalUpdate(true);
  const handleCloseModalUpdate = () => setOpenModalUpdate(false);

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
        }}
      >
        <TableContainer component={Paper}>
          <TableContainer
            sx={{
              minWidth: 650,
              backgroundColor: '#323259',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    size="small"
                    sx={{ color: '#fff' }}
                    onChange={(e, check) => {
                      handleCheckAll(check);
                      console.log('🚀 ~ file: ProductListTable.tsx ~ line 76 ~ ProductListTable ~ check', check);
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
              {tableData?.slice(pageInfo * rowsPerPage, pageInfo * rowsPerPage + rowsPerPage).map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left" sx={{ color: '#fff' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Checkbox
                        size="small"
                        sx={{ color: '#fff' }}
                        checked={item.checked}
                        onChange={() => {
                          handleCheckItem(item.id);
                          console.log(
                            '🚀 ~ file: ProductListTable.tsx ~ line 131 ~ ProductListTable ~ checked',
                            item.checked,
                          );
                        }}
                      />
                      <Button onClick={handleOpenModalUpdate}>
                        <PowerSettingsNewRoundedIcon
                          fontSize="medium"
                          sx={{
                            color: '#2dc653',
                            padding: '6px',
                            alignSelf: 'center',
                          }}
                        />
                      </Button>
                      <Modal
                        open={openModalUpdate}
                        onClose={handleCloseModalUpdate}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <ModalUpdate />
                      </Modal>
                    </Box>
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff', width: '80px', overflow: 'hidden' }}>
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
                    <Link
                      className="detailLink"
                      style={{ textDecoration: 'none' }}
                      // to="/products/product-detail/{product_id}"
                      to={`${ROUTES.productDetail}`}
                    >
                      {item.name}
                    </Link>
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
                    <Link
                      className="detailLink"
                      style={{ textDecoration: 'none' }}
                      // to="/user/user-detail/{id}"
                      to={`${ROUTES.productDetail}`}
                    >
                      {item.vendor}
                    </Link>
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff', minWidth: '100px' }}>
                    {moment(+item.arrivalDate * 1000).format('ll')}
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
      </Paper>
    </>
  );
};

export default ProductListTable;
