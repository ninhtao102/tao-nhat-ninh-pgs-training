import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

interface Props {
  btnDisable: boolean;
  handleRemovebtn(): void;
}

const UserFooter = (props: Props) => {
  const { btnDisable, handleRemovebtn } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        <Box>
          <Button
            variant="contained"
            disabled={btnDisable}
            sx={{
              width: '210px',
              backgroundColor: '#f0ad4e',
              '&: hover': {
                backgroundColor: '#f0ad4e',
                color: '#000',
              },
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Remove selected
          </Button>
        </Box>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal_content" style={{ backgroundColor: '#323259' }}>
          <div style={{ display: 'flex', color: 'white', borderBottom: '1px solid black' }}>
            <Typography variant="h6" style={{ margin: '15px' }}>
              Confirm Delete
            </Typography>
          </div>
          <div style={{ display: 'flex', color: 'white', marginBottom: '20px', borderBottom: '1px solid black' }}>
            <Typography style={{ margin: '20px 15px' }}>Do you want to delete this product?</Typography>
          </div>
          <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between', margin: '0px 40px' }}>
            <Button
              variant="contained"
              sx={{ color: 'white', backgroundColor: '#a16eff' }}
              onClick={() => {
                handleRemovebtn();
                setIsModalOpen(false);
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              sx={{ color: 'white', backgroundColor: '#ff3d71' }}
              onClick={() => setIsModalOpen(false)}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UserFooter;
