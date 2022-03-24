import { Box, Button, Link } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { API_HEADER, API_PATHS } from '../../../configs/api';
import { IUserFilter } from '../../../models/filter';
import { IUserItem } from '../../../models/user';
import { ISort } from '../../../models/utils';
import UserFilter from '../components/filter/UserFilter';
import UserFooter from '../components/table/UserFooter';
import UserListTable from '../components/table/UserListTable';

interface Props {}

const UserListPage = (props: Props) => {
  const [filter, setFilter] = useState<IUserFilter>();
  const [sortInfo, setsortInfo] = useState<ISort>({
    order_by: 'name',
    sort: 'asc',
  });
  const [totalItem, setTotalItem] = useState<number>(0);
  const [tableData, setTableData] = useState<IUserItem[]>();
  const [pageInfo, setPageInfo] = useState(1);
  const [checked, setChecked] = useState(false);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, number: number) => {
    setPageInfo(number);
  };

  const handleFilter = (data: IUserFilter) => {
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
    fetch(API_PATHS.users, {
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
        // console.log('tableData', data);
        // console.log('recordsTotal', data.recordsTotal);
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
        <UserFilter handleFilter={handleFilter} />
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
          <Link id="newProductLink" href="http://localhost:3000/user/new-user" underline="none" sx={{ color: '#fff' }}>
            Add User
          </Link>
          {/* Link react dom */}
        </Button>
        {tableData && (
          <UserListTable
            tableData={tableData}
            sortInfo={sortInfo}
            totalItem={totalItem}
            pageInfo={pageInfo}
            handleSort={handleSort}
            handleCheckItem={handleCheckItem}
            handleChangePage={handleChangePage}
          />
        )}
        <Box sx={{ position: 'fixed', bottom: '3px', width: 'calc(100vw - 22vw)' }}>
          <UserFooter />
        </Box>
      </Box>
    </>
  );
};

export default UserListPage;
