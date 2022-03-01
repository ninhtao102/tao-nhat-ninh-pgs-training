import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { Box, Typography, AppBar, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import React, { FC } from 'react';
import { useLocation } from 'react-router';
import { ROUTES } from '../../configs/routes';
import SideBar from './SideBar';

interface Props {}

const Header: FC<Props> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(location.pathname === ROUTES.login);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (location.pathname === ROUTES.login) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [location.pathname]);

  if (isHidden) {
    return <div></div>;
  } else {
    return (
      <Box>
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: '#323259', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <IconButton onClick={() => setSideBarOpen(!sideBarOpen)}>
                <MenuRoundedIcon sx={{ color: '#a6a6cd', fontSize: '27px' }} />
              </IconButton>
              <Typography variant="h5" component="div" sx={{ color: '#fff', margin: 'auto' }}>
                Gear Focus Admin
              </Typography>
              <IconButton>
                <NotificationsNoneRoundedIcon sx={{ color: '#fff', fontSize: '27px' }} />
              </IconButton>
            </Box>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <PersonOutlineRoundedIcon sx={{ color: '#a6a6cd', fontSize: '27px' }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div>
          <SideBar
            sideBarOpen={sideBarOpen}
            closeSideBar={() => {
              setSideBarOpen(false);
            }}
          />
          {children}
        </div>
      </Box>
    );
  }
};

export default Header;
