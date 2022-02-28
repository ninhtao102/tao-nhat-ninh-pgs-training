import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

interface Props {}

const SideBar = (props: Props) => {
  return (
    <div>
      <Box>
        <Typography variant="h6" gutterBottom component="div">
          Account Page
        </Typography>
        <Box></Box>
      </Box>
    </div>
  );
};

export default SideBar;
