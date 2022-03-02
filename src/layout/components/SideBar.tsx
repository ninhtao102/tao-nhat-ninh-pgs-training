import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

interface Props {
  sideBarOpen: boolean;
  closeSideBar(): void;
}

const SideBar = (props: Props) => {
  const drawerWidth = props.sideBarOpen ? '35vh' : 0;
  const [openCatalog, setOpenCatalog] = React.useState(true);
  const [openUsers, setOpenUsers] = React.useState(true);

  const handleClickCatalog = () => {
    setOpenCatalog(!openCatalog);
  };
  const handleClickUsers = () => {
    setOpenUsers(!openUsers);
  };
  return (
    <div className="" style={{ backgroundColor: '#323259', marginTop: '64px', zIndex: 1 }}>
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
            // height: '100%',
            minHeight: '150vh',
            color: 'white',
          },
        }}
      >
        <List component="nav" aria-labelledby="nested-list-subheader">
          <ListItemButton onClick={handleClickCatalog}>
            <ListItemIcon>
              <LocalOfferOutlinedIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Catalog" />
            {openCatalog ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCatalog} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ mx: 2, borderTop: '1px solid #000' }}>
                <ListItemText primary="Products" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClickUsers} sx={{ borderTop: '1px solid #000' }}>
            <ListItemIcon>
              <GroupOutlinedIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {openUsers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openUsers} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ mx: 2, borderTop: '1px solid #000' }}>
                <ListItemText primary="Users list" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </div>
  );
};

export default SideBar;
