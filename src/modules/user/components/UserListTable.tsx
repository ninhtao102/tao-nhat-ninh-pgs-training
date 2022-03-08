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
import { API_PATHS } from '../../../configs/api';

const columns = [
  { field: 'id', headerName: 'Login/Email' },
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
  return <div>abc</div>;
};

export default UserListTable;
