import { useState, useContext } from 'react';
import { 
  Box,
  Modal,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import AppContext from '../../../AppContext';
import Avatar from "../Avatar";
import Menu from "../Menu";

export default function MobileMenu() {

  const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(AppContext);

  const handleOpen = () => setIsMobileMenuOpen(true);
  const handleClose = () => setIsMobileMenuOpen(false);

  return (

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >

     <Avatar />
     <MenuIcon sx={{width: 50, height:30}} onClick={handleOpen}/>

     <Modal
        open={isMobileMenuOpen}
        onClose={handleClose}
        keepMounted
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            outline: 0,
            p: 4
          }}
        >
          <Menu />
        </Box>
      </Modal>

    </Box>

  )
}