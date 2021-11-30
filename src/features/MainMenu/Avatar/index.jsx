import { useState } from 'react';
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
  Select
} from '@mui/material'
import { styled } from '@mui/material/styles';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

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

  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState("BR");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleAvatarMenu = (e) => {
    setAnchorEl(e.currentTarget);
    setIsAvatarMenuOpen(prev => !prev);
  };

  const handleToggleTheme = () => {    
    setIsDarkMode(prev => !prev);
  };

  return (
    <>
    <Toolbar>      
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar
            alt="Name"
            // src="/static/images/avatar/1.jpg"
            onClick={handleToggleAvatarMenu}
          >
            NE
          </Avatar>
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
            <FormLabel component="legend">Tema</FormLabel>
            <FormGroup aria-label="position" row>              
              <Grid component="label" container alignItems="center" spacing={0}>

                <Grid item>
                  <LightModeOutlinedIcon />
                </Grid>

                <Grid item>
                  <Switch
                    checked={isDarkMode}
                    onChange={(e) => {handleToggleTheme(); handleToggleAvatarMenu(e)}}
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
          <FormControl sx={{ minWidth: 105 }} component="fieldset">
            <FormLabel component="legend">Idioma</FormLabel>
            <Select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >              
              <MenuItem onClick={handleToggleAvatarMenu} value={"BR"}>
                <img
                  width="30px"
                  alt="BR"
                  src="http://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg"
                />                
              </MenuItem>
              <MenuItem onClick={handleToggleAvatarMenu} value={"US"}>
                <img
                  width="30px"
                  alt="US"
                  src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                />                
              </MenuItem>
              <MenuItem onClick={handleToggleAvatarMenu} value={"ES"}>
                <img
                  width="30px"
                  alt="SP"
                  src="http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg"
                />                
              </MenuItem>
            </Select>            
          </FormControl>
        </MenuItem>

        <MenuItem onClick={handleToggleAvatarMenu}>Logout</MenuItem>

      </Menu>
    
    <Divider />
    </>
  )

}