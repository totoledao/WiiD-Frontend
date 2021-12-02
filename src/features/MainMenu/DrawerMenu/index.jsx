import { useState } from 'react';
import {
  CssBaseline,
  Box,
  Drawer
} from '@mui/material';

import Menu from "../Menu";
import Avatar from '../Avatar';

export default function DrawerMenu() {

  const [drawerWidth, setDrawerWidth] = useState(240);
  const minDrawerWidth = 52;
  const maxDrawerWidth = 500;


  const handleStartResizing = () => {
    document.addEventListener("mouseup", handleEndResizing, true);
    document.addEventListener("mousemove", handleResizeDrawer, true);
  };

  const handleEndResizing = () => {
    document.removeEventListener("mouseup", handleEndResizing, true);
    document.removeEventListener("mousemove", handleResizeDrawer, true);
  };

  const handleResizeDrawer = e => {  
    if(e.clientX > minDrawerWidth && e.clientX < maxDrawerWidth) {
      setDrawerWidth(e.clientX);
    }
  };

  return (

    <Box sx={{ position: "relative" }} >

      <CssBaseline />  
    
      <Drawer
        sx={{
          position: 'relative',
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Avatar />
        <Menu />  
      </Drawer>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: drawerWidth - 5,
          width: 10,
          height: "100vh",
          zIndex: 10000,
          '&:hover': {
            cursor: "w-resize",
            backgroundColor: "rgba(0, 0, 0, 0.05)"
          }
        }}
        onMouseDown={(e) => handleStartResizing(e)}
      />

    </Box >

  )  
}