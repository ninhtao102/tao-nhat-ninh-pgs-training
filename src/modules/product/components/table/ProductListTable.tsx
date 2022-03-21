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
  Link,
} from '@mui/material';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { API_PATHS } from '../../../../configs/api';
import { IProductItem } from '../../../../models/product';
import ModalUpdate from '../table/ModalUpdate';

interface Props {}

const columns = [
  { field: 'id', headerName: 'SKU' },
  { field: 'id', headerName: 'Name' },
  { field: 'id', headerName: 'Category' },
  { field: 'id', headerName: 'Price' },
  { field: 'id', headerName: 'In stock' },
  { field: 'id', headerName: 'Vendor' },
  { field: 'id', headerName: 'Arrival Date' },
  { field: 'id', headerName: '' },
];

const ProductListTable = (props: Props) => {
  const [rows, setRows] = useState<IProductItem[]>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalItem, setTotalItem] = useState();

  const [openModalUpdate, setOpenModalUpdate] = React.useState(false);

  const handleOpenModalUpdate = () => setOpenModalUpdate(true);
  const handleCloseModalUpdate = () => setOpenModalUpdate(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = useCallback(() => {
    fetch(API_PATHS.products)
      .then((response) => response.json())
      .then((data) => {
        setRows(data.data);
        setTotalItem(data.recordsTotal);
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
        }}
      >
        <TableContainer component={Paper}>
          <TableContainer
            sx={{
              minWidth: 650,
              // maxHeight: 650,
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
                  <TableCell align="left" sx={{ color: '#fff' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Checkbox size="small" sx={{ color: '#fff' }} />
                      <Button onClick={handleOpenModalUpdate}>
                        <PowerSettingsNewRoundedIcon
                          fontSize="medium"
                          sx={{
                            color: '#2dc653',
                            padding: '6px',
                            alignSelf: 'center',
                            // borderLeft: '0.5px solid #fff',
                            // borderRight: '0.5px dashed #fff',
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
                    <Link href="#" underline="hover">
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
                    <Link href="#" underline="hover">
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

export default ProductListTable;
