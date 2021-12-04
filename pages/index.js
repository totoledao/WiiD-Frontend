import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { DrawerMenu, MobileMenu } from "../src/features/MainMenu";
import Mailbox from '../src/features/Mailbox';

export default function Index() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

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