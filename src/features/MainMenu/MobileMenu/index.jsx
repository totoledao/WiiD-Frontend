import { useState } from 'react';
import { 
  Box,
  Modal,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Avatar from "../Avatar";
import Menu from "../Menu";

export default function MobileMenu() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        open={open}
        onClose={handleClose}
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