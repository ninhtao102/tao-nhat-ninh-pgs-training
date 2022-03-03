import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface Props {}

const btnStyle = {
  width: '10vh',
  height: '7vh',
  fontWeight: 'bold',
  '&:hover': {
    opacity: 0.6,
    transition: '0.3s',
  },
};

const ModalUpdate = (props: Props) => {
  return (
    <Box
      sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40vw',
        height: '28vh',
        backgroundColor: '#323259',
        border: '2px solid #000',
        // boxShadow: 24,
      }}
    >
      <Typography
        id="modal-update-title"
        variant="h6"
        component="h2"
        sx={{ color: '#fff', padding: '2vh 3vh', fontWeight: 'bold', borderBottom: '0.5px solid #000' }}
      >
        Confirm Update
      </Typography>
      <Typography
        id="modal-update-title"
        variant="h6"
        component="h2"
        sx={{ color: '#fff', padding: '2vh 3vh', borderBottom: '0.5px solid #000' }}
      >
        Do you want to update this product?
      </Typography>
      <Box sx={{ padding: '2vh 3vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="contained"
          sx={[
            btnStyle,
            {
              backgroundColor: '#8156e1',
              '&:hover': {
                backgroundColor: '#8156e1',
              },
            },
          ]}
        >
          yes{' '}
        </Button>
        <Button
          variant="contained"
          sx={[
            btnStyle,
            {
              backgroundColor: '#ff3f72',
              '&:hover': {
                backgroundColor: '#ff3f72',
              },
            },
          ]}
        >
          no
        </Button>
      </Box>
    </Box>
  );
};

export default ModalUpdate;
