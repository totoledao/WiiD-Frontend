import { useState, useContext } from 'react';
import Router from 'next/router'
import {
  Grid,
  FormLabel,
  FormControl,
  FormGroup,
  Toolbar,
  Divider,
  Avatar,
  Badge,
  Switch,
  Menu,
  MenuItem,
  InputLabel,
  Typography,
  Select
} from '@mui/material'
import { styled } from '@mui/material/styles';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import AppContext from '../../../AppContext';
import language from '../../../language';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function AvatarMenu() {

  const { colorMode, setIsAuth, languageSelected, setLanguageSelected } = useContext(AppContext);

  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleAvatarMenu = (e) => {
    setAnchorEl(e.currentTarget);
    setIsAvatarMenuOpen(prev => !prev);
  };

  const handleToggleTheme = (e) => {
    handleToggleAvatarMenu(e);    
    setIsDarkMode(prev => !prev);
    colorMode.toggleColorMode();
  };
  
  const handleChangeLanguage = (e) => {
    setLanguageSelected(e.target.value);
  };

  const handleLogout = (e) => {
    document.cookie = "isAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    handleToggleAvatarMenu(e);
    Router.push('/login');
    setIsAuth(false);
  };

  return (
    <>
    <Toolbar>      
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar sx={{alignItems: "center", justifyContent: "center", textAlign: 'center'}} 
            alt="GT" src={`https://avatars.dicebear.com/api/initials/GT.svg`}
            onClick={handleToggleAvatarMenu}
          />           
        </StyledBadge>
      </Toolbar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isAvatarMenuOpen}
        onClose={handleToggleAvatarMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <MenuItem>
          <FormControl component="fieldset">
            <FormLabel component="legend">{language[languageSelected].menus.theme}</FormLabel>
            <FormGroup aria-label="position" row>              
              <Grid component="label" container alignItems="center" spacing={0}>

                <Grid item>
                  <LightModeOutlinedIcon />
                </Grid>

                <Grid item>
                  <Switch
                    checked={isDarkMode}
                    onChange={handleToggleTheme}
                  />
                </Grid>

                <Grid item>
                  <DarkModeOutlinedIcon />
                </Grid>

              </Grid>
            </FormGroup>
          </FormControl>     
        </MenuItem>

        <MenuItem> 
          <FormControl component="fieldset">
            <FormLabel component="legend">{language[languageSelected].menus.language}</FormLabel>
            <Select
              value={languageSelected}
              onChange={e => handleChangeLanguage(e)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{               
                pt: 1,
              }}
            >              
              <MenuItem 
                sx={{
                  display:"flex",
                  "&::after": {
                    paddingLeft: "5px",
                    content: '"pt"'
                  }
                }}
                onClick={handleToggleAvatarMenu}
                value={"br"}
              >
                <img
                  width="40px"
                  alt="BR"
                  src="http://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg"
                />                
              </MenuItem>
              <MenuItem
                sx={{
                  display:"flex",
                  "&::after": {
                    paddingLeft: "5px",
                    content: '"en"'
                  }
                }}
                 onClick={handleToggleAvatarMenu}
                 value={"en"}
              >
                <img                  
                  width="40px"
                  alt="US"
                  src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                />                             
              </MenuItem>
              <MenuItem
                sx={{
                  display:"flex",
                  "&::after": {
                    paddingLeft: "5px",
                    content: '"es"'
                  }
                }}
                onClick={handleToggleAvatarMenu}
                value={"es"}
              >
                <img
                  width="40px"                  
                  alt="SP"
                  src="http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg"
                />       
              </MenuItem>
            </Select>            
          </FormControl>
        </MenuItem>

        <MenuItem onClick={handleLogout}>{language[languageSelected].menus.logout}</MenuItem>

      </Menu>
    
    <Divider />
    </>
  )

}