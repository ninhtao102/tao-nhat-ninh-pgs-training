import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
        setuserNav('#fff');
        break;
      case '/products/new-product':
        setproductNav('#6f53b4');
        setuserNav('#fff');
        break;
      case '/user/manage-user':
        setuserNav('#6f53b4');
        setproductNav('#fff');
        break;
      case '/user/new-user':
        setuserNav('#6f53b4');
        setproductNav('#fff');
        break;
      default:
        setproductNav('#fff');
        setuserNav('#fff');
    }
  }, [currentPath]);

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
          <ListItemButton onClick={handleClickCatalog} sx={{ color: productNav, ':hover': { color: '#6f53b4' } }}>
            <ListItemIcon>
              <LocalOfferOutlinedIcon sx={{ color: productNav }} />
            </ListItemIcon>
            <ListItemText primary="Catalog" sx={{ color: productNav }} />
            {openCatalog ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCatalog} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to="/products/manage-product"
                className="navLink"
                style={{
                  color: productNav,
                }}
              >
                <ListItemButton
                  sx={{ mx: 2, borderTop: '1px solid #000', ':hover #productListLink': { color: '#6f53b4' } }}
                >
                  <ListItemText primary="Products" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <ListItemButton
            onClick={handleClickUsers}
            className="navLink"
            sx={{ color: userNav, borderTop: '1px solid #000' }}
          >
            <ListItemIcon>
              <GroupOutlinedIcon className="navLink" sx={{ color: userNav }} />
            </ListItemIcon>
            <ListItemText primary="Users" sx={{ color: userNav }} />
            {openUsers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openUsers} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/user/manage-user" id="userListLink" className="navLink" style={{ color: userNav }}>
                <ListItemButton
                  sx={{ mx: 2, borderTop: '1px solid #000', ':hover #userListLink': { color: '#6f53b4' } }}
                >
                  <ListItemText primary="Users" className="navLink" sx={{ ':hover ': { color: '#6f53b4' } }} />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </div>
  );
};

export default SideBar;
