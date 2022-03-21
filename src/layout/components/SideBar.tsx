import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Collapse, Drawer, Link, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  sideBarOpen: boolean;
  closeSideBar(): void;
}

const SideBar = (props: Props) => {
  const drawerWidth = props.sideBarOpen ? '16vw' : 0;
  const [openCatalog, setOpenCatalog] = useState(true);
  const [openUsers, setOpenUsers] = useState(true);
  const [productNav, setproductNav] = useState('#fff');
  const [userNav, setuserNav] = useState('#fff');
  const location = useLocation();
  const currentPath = location.pathname;

  const handleClickCatalog = () => {
    setOpenCatalog(!openCatalog);
  };
  const handleClickUsers = () => {
    setOpenUsers(!openUsers);
  };

  useEffect(() => {
    switch (currentPath) {
      case '/products/manage-product':
        setproductNav('#6f53b4');
        break;
      case '/products/new-product':
        setproductNav('#6f53b4');
        break;
      case '/user/manage-user':
        setuserNav('#6f53b4');
        break;
      case '/user/new-user':
        setuserNav('#6f53b4');
        break;
      default:
        setproductNav('#fff');
    }
  }, [document.onload]);

  return (
    <div style={{ backgroundColor: '#323259', marginTop: '64px', zIndex: 1, boxShadow: '1px 1px 8px black' }}>
      <Drawer
        open={props.sideBarOpen}
        onClose={() => props.closeSideBar()}
        anchor="left"
        variant="persistent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: 'calc(100vh - 64px)',
          transition: 'all 0.5s ease-in-out',
          '& .MuiDrawer-paper': {
            backgroundColor: '#323259',
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'relative',
            minHeight: '150vh',
            color: 'white',
          },
        }}
      >
        <List component="nav" aria-labelledby="nested-list-subheader" sx={{ width: 'inherit', position: 'fixed' }}>
          <ListItemButton onClick={handleClickCatalog} sx={{ color: '#fff', ':hover': { color: '#6f53b4' } }}>
            <ListItemIcon>
              <LocalOfferOutlinedIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Catalog" />
            {openCatalog ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCatalog} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ mx: 2, borderTop: '1px solid #000', ':hover #productListLink': { color: '#6f53b4' } }}
              >
                <Link
                  id="productListLink"
                  href="http://localhost:3000/products/manage-product"
                  underline="none"
                  sx={{
                    color: productNav,
                  }}
                >
                  <ListItemText primary="Products" />
                </Link>
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton
            onClick={handleClickUsers}
            sx={{ borderTop: '1px solid #000', ':hover': { color: '#6f53b4' } }}
          >
            <ListItemIcon>
              <GroupOutlinedIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {openUsers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openUsers} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ mx: 2, borderTop: '1px solid #000', ':hover #userListLink': { color: '#6f53b4' } }}>
                <Link
                  id="userListLink"
                  href="http://localhost:3000/user/manage-user"
                  underline="none"
                  sx={{ color: userNav }}
                >
                  <ListItemText primary="Users" />
                </Link>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </div>
  );
};

export default SideBar;
