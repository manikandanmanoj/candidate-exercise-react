import React from 'react';
import { Box,Modal,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { theme } from '../styles';

  interface modalProps{
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    children:React.ReactNode
  }

const ModalComponent = ({ open,setOpen,children }:modalProps) => {
  return (
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width:{ xs: 250, sm: 400,md:400 },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius:'10px'
        }}>
         <IconButton 
          sx={{
             position:'absolute',
             top:'-9px',
             right:'-3px',
             background:theme.global?.blue,
             color:'white',
             '&:hover': {
                background:theme.global?.blue,
                color:'white',
              }
             }}
          onClick={()=>setOpen(false)}> 
          <CloseIcon/>
         </IconButton>
            {children}
        </Box>
      </Modal>
  );
};

export default ModalComponent;