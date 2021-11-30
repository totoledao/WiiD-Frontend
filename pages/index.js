import { Box } from '@mui/material';

import { DrawerMenu } from "../src/features/MainMenu";

export default function Index() {
  return (
    <Box sx={{ display: "flex" }}>
      <DrawerMenu />
      <div>aaa</div>
    </Box>
  )
}