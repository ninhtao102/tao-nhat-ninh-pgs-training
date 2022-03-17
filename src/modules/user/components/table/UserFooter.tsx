import { Box, Button, Grid } from '@mui/material';
import React from 'react';

interface Props {}

const UserFooter = (props: Props) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#323259',
          margin: '5vh 0 1vh 0',
          padding: '3vh 5vh',
          boxShadow: '1px 1px 11px #b18aff',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box>
              <Button
                variant="contained"
                sx={{
                  marginRight: '2vh',
                  opacity: '0.5',
                  backgroundColor: '#f0ad4e',
                  '&: hover': {
                    backgroundColor: '#f0ad4e',
                    color: '#000',
                  },
                }}
              >
                Remove selected
              </Button>
            </Box>
          </Grid>
          <Grid item xs={7}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserFooter;
