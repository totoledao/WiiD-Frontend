import { useContext, useEffect } from 'react';
import Router from 'next/router'
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { DrawerMenu, MobileMenu } from "../src/features/MainMenu";
import Mailbox from '../src/features/Mailbox';
import AppContext from '../src/AppContext';

export default function Index() {
  const { isAuth } = useContext(AppContext);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {    
    if(!isAuth){
      Router.push('/login');
    }
  });
  
  if(!isAuth){
    return <div></div>
  }
    
  if(matches){
    return (
      <Box>
        <MobileMenu />
        <Mailbox />
      </Box>
    )
  } else return (
    <Box sx={{ display: "flex" }}>
      <DrawerMenu />
      <Mailbox />
    </Box>
  )
}