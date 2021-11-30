import { Fragment, useEffect, useState } from 'react';

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

function Loading () {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

function MenuItem( item ) {   
  const [open, setOpen] = useState(false);

  const handleToggleItem = () => {
    setOpen(prev => !prev);
  };

  return ( 
    <Fragment key={item.id}>

      <ListItemButton onClick={handleToggleItem}>

        <ListItemText primary={item.name} />
        {open ? <ExpandLess /> : <ExpandMore />}

      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        {item.subMenus.map((subMenu, id) => (
          <Fragment key={subMenu.id}> 
            <ListItemButton sx={{ pl: 4 }} onClick={() => console.log(subMenu.id) }>            

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
  
  const [menuData, setMenuData] = useState([]);  
  
  const getMenuData = async () => {
    const res = await fetch("http://my-json-server.typicode.com/workinideas/vagafrontendteste/menus");
    const data = await res.json();
    
    setMenuData(data);
  }

  const PopulateMenuItems = () => menuData.map( (item, index) => MenuItem(item) );

  useEffect(() => {
    getMenuData();   
  },[])  

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