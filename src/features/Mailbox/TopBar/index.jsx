import { useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  InputBase,
  Button,
  Checkbox,
  Stack
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import AppContext from '../../../AppContext';
import language from '../../../language';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',  
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',  
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function TopBar( {emails, setEmails, selectedEmails, setSelectedEmails} ){

  const { languageSelected } = useContext(AppContext);

  const handleArquivar = () => {
    let filteredEmails = [...emails];
    let filter = [...selectedEmails];
    filter.sort( (a,b) => b-a );

    for (let index = 0; index < filter.length; index++) {
      filteredEmails.splice(filter[index], 1);
    }

    setEmails(filteredEmails);
    setSelectedEmails([]);
  };

  const handleCheckboxToggle = () => {
    if( selectedEmails.length === emails.length ){
      setSelectedEmails(prev => []);
    } else {    
      setSelectedEmails([...Array(emails.length).keys()]);
    }
  };

  return(
    <Box sx={{
      flexGrow: 1,
      alignItems: "center",
      justifyContent:"center",
      paddingTop: 1,
      paddingBottom: 1
    }}>

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={language[languageSelected].search}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>

      <Box sx={{ 
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent:"center",
        paddingTop: 1,
        maxWidth: "100vw"
      }}>

        <Stack direction="row" spacing={1}>

          <Checkbox

            checked={selectedEmails.length === 0 ? false : selectedEmails.length === emails.length}
            onChange={handleCheckboxToggle}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <Button variant="outlined"
            onClick={handleArquivar}
          >
            {language[languageSelected].buttons.archive}
          </Button>

          <Button variant="outlined" disabled>
            {language[languageSelected].buttons.assign}
          </Button>

          <Button variant="outlined" disabled>
            {language[languageSelected].buttons.schedule}
          </Button>         
        </Stack>

      </Box>
    </Box>
  )
}