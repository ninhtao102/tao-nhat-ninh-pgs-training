import { Box, Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_HEADER, API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { IUserFilter } from '../../../models/filter';
import { IUserItem } from '../../../models/user';
import { ISort } from '../../../models/utils';
import UserFilter from '../components/filter/UserFilter';
import UserFooter from '../components/table/UserFooter';
import UserListTable from '../components/table/UserListTable';

const UserListPage = () => {
  const [filter, setFilter] = useState<IUserFilter>();
  const [sortInfo, setsortInfo] = useState<ISort>({
    order_by: 'name',
    sort: 'asc',
  });
  const [totalItem, setTotalItem] = useState<number>(0);
  const [tableData, setTableData] = useState<IUserItem[]>();
  const [pageInfo, setPageInfo] = useState(1);
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [selectItem, setSelectItem] = useState<IUserItem[]>([]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, number: number) => {
    setPageInfo(number);
  };

  const handleFilter = (data: IUserFilter) => {
    setFilter(data);
  };

  const handleCheckAll = useCallback((check: boolean) => {
    setTableData((prev) => {
      return prev?.map((item) => {
        return { ...item, checked: check };
      });
    });
  }, []);

  const handleCheckItem = useCallback((id: string) => {
    setTableData((prev) => {
      return prev?.map((item) => {
        if (item.profile_id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
    });
  }, []);

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

  const handleRemoveUser = useCallback(() => {
    const params = selectItem?.map((item) => {
      return { id: item.profile_id, delete: 1 };
    });

    fetch(API_PATHS.usersEdit, {
      method: 'post',
      ...API_HEADER,
      body: JSON.stringify({
        params,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Delete User Success:', result);
        fetchData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [fetchData, selectItem]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (selectItem.length > 0) {
      setIsBtnDisable(false);
    } else {
      setIsBtnDisable(true);
    }
  }, [selectItem]);

  useEffect(() => {
    if (tableData && tableData.length > 0) {
      setSelectItem(tableData.filter((item) => item.checked === true));
      return;
    } else {
      return;
    }
  }, [tableData]);

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
        <Link style={{ textDecoration: 'none' }} to={`${ROUTES.userForm}`}>
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
            Add User
          </Button>
        </Link>
        {tableData && (
          <UserListTable
            tableData={tableData}
            sortInfo={sortInfo}
            totalItem={totalItem}
            pageInfo={pageInfo}
            handleSort={handleSort}
            handleCheckAll={handleCheckAll}
            handleCheckItem={handleCheckItem}
            handleChangePage={handleChangePage}
          />
        )}
        <Box sx={{ position: 'fixed', bottom: '3px', width: 'calc(100vw - 22vw)' }}>
          <UserFooter btnDisable={isBtnDisable} handleRemovebtn={handleRemoveUser} />
        </Box>
      </Box>
    </>
  );
};

export default UserListPage;
