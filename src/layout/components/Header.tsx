import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../configs/routes';
import { resetData } from '../../modules/auth/redux/authReducer';
import { AppState } from '../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../utils/constants';
import SideBar from './SideBar';

interface Props {}

const Header: FC<Props> = ({ children }) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const auth = Cookies.get(ACCESS_TOKEN_KEY);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const [sideBarOpen, setSideBarOpen] = React.useState(true);
  const [isHidden, setIsHidden] = React.useState(location.pathname === ROUTES.login);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOut = () => {
    if (auth) {
      dispatch(resetData());
      Cookies.remove(ACCESS_TOKEN_KEY, { path: '/', domain: 'localhost' });
      dispatch(replace(ROUTES.home));
    } else {
      dispatch(replace(ROUTES.home));
    }
  };

  React.useEffect(() => {
    if (location.pathname === ROUTES.login) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [location.pathname]);

  if (isHidden) {
    return <div>{children}</div>;
  } else {
    return (
      <Box>
        <AppBar position="fixed" sx={{ zIndex: 10 }}>
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
                <MenuItem onClick={onLogOut}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ display: 'flex' }}>
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
