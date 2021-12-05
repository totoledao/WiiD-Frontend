import { Fragment, useContext, useEffect, useState } from 'react';
import { alpha } from '@mui/material';
import {
  Box, 
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  CircularProgress
 } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import AppContext from '../../../AppContext';
import Loading from '../../../components/Loading';


function MenuItem ( item ) {
  
  const { selectedMenu, setSelectedMenu, setIsMobileMenuOpen, setIsLoadingEmails } = useContext(AppContext);
  
  const [open, setOpen] = useState(false);
  
  const handleToggleItem = () => {
    setOpen(prev => !prev);
  };

  const openMenuOnMount = () => {
    if( item.subMenus.some( subMenu => subMenu.id === selectedMenu ) ){
      setOpen(true);
    }
  };

  useEffect(() => {
    openMenuOnMount();
  },[]);
  
  return ( 
    <Fragment key={item.id}>

      <ListItemButton onClick={handleToggleItem}>

        <ListItemText primary={item.name} />
        {open ? <ExpandLess /> : <ExpandMore />}

      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        {item.subMenus.map( subMenu => (
          <Fragment key={subMenu.id}> 
            <ListItemButton              
              sx={() => {
                if( selectedMenu === subMenu.id){
                  return {
                    pl: 4, 
                    backgroundColor: "primary.main", 
                    color: "white",
                    "& :hover": {
                      color: "text.primary"
                    }
                  }
                } else return {pl: 4}
              }}
              onClick={() => {
                setSelectedMenu(subMenu.id);
                setIsMobileMenuOpen(false);
                setIsLoadingEmails(true);
              }}
              >         

              <ListItemText primary={subMenu.name} />

            </ListItemButton>
          </Fragment>
        ))}
          
        </List>
      </Collapse>
    </Fragment>
  )
}

export default function Menu() {

  const { setSelectedMenu } = useContext(AppContext);
  
  const [menuData, setMenuData] = useState([]);  
  
  const getMenuData = async () => {
    const res = await fetch("https://my-json-server.typicode.com/workinideas/vagafrontendteste/menus");
    const data = await res.json();

    setMenuData(data);
    setSelectedMenu(data[0].subMenus[0].id);
  };

  const PopulateMenuItems = () => menuData.map( item => MenuItem(item) );

  useEffect(() => {
    getMenuData();    
  },[]);

  return (

    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"      
    >

  { menuData.length < 1 ? <Loading /> : <PopulateMenuItems /> }

  </List>

  )
}