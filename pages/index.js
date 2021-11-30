import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { DrawerMenu, MobileMenu } from "../src/features/MainMenu";

export default function Index() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  if(!matches){
    return (
      <Box>
        <MobileMenu />
        <div>aaa</div>
      </Box>
    )
  } else return (
    <Box sx={{ display: "flex" }}>
      <DrawerMenu />
      <div>aaa</div>
    </Box>
  )
}