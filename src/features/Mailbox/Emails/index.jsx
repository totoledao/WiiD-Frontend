import { useEffect, useState, useContext } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  AvatarGroup,
  Checkbox,
  IconButton,
  Typography
} from '@mui/material';

import AppContext from '../../../AppContext';
import Loading from '../../../components/Loading';

function Email(email, index, selectedEmails, setSelectedEmails) {
  const [onHover, setOnHover] = useState(false);

  const EmailNormal = () => { return (
    <Card key={`email${email.id}`}
      sx={{marginLeft: 3, marginRight: 3, marginBottom: 1}}
      onMouseEnter={() => setOnHover(true)}
    >
      
      <CardContent>
      <Grid container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={0}
      >

        <Grid item xs={1} sx={{ width: "5ch"}}>        
          <Avatar sx={{ alignItems: "center", justifyContent: "center", textAlign: 'center' }} 
            alt={email.owner} src={`https://avatars.dicebear.com/api/initials/${email.owner}.svg`}
          />        
        </Grid>

        <Grid item xs={9} sx={{width: "100ch", overflow: "hidden"}}>
          <Typography variant="subtitle1" color="text.secondary" component="div" noWrap >
            {email.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" noWrap >
          {email.subject}
          </Typography>
          <Typography color="text.secondary" component="div" noWrap >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit eum fuga esse deserunt animi eligendi neque quas cumque sed. In quaerat tempora voluptatum quod consequuntur voluptates magnam cum ea porro.
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={1} sx={{width: "10ch"}} >
          <Typography variant="subtitle1" color="text.secondary" component="div"
            sx={{ justifyContent: "end", alignItems:"center", textAlign: "end" }}
          >
            Hora
          </Typography>
          <Box sx={{display: 'flex', justifyContent: "end", alignItems: "center", pl: 1, pb: 1}}>
            <AvatarGroup max={3} >
              {email.users.map( (user, index) => 
                <Avatar key={`${user,index}`} sx={{boxShadow: "inset 0 0 10px gold"}}
                  alt={user} src={`https://avatars.dicebear.com/api/initials/${user}.svg`}
                />
              )}    
            </AvatarGroup>         
          </Box>
        </Grid>
    
      </Grid> 
      </CardContent>      
    </Card>
  )}

  const EmailHover = () => {    
    let handleCheckboxToggle;

    if( !selectedEmails.some( emailIndex => emailIndex === index  ) ){
      handleCheckboxToggle = () => {
        setSelectedEmails(prev => [...prev, index]);
      };
    } else {
      handleCheckboxToggle = () => {
        setSelectedEmails(prev => prev.filter( emailIndex => emailIndex !== index));
      };
    }
    
    return (
    <Card key={`email${email.id}`}      
      sx={{marginLeft: 3, marginRight: 3, marginBottom: 1, backgroundColor:"secondary.main" }}      
      onMouseLeave={() => setOnHover(false)}
    >
      <CardContent>
      <Grid container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={0}
      >

        <Grid item xs={1} sx={{ width: "5ch"}}>        
          <Checkbox
            sx={{ 
              alignItems: "center",
              justifyContent: "center",
              textAlign: 'center', 
              '& .MuiSvgIcon-root': { 
                fontSize: "2rem"
              }
            }}  
            checked={selectedEmails.some( emailIndex => emailIndex === index  )}
            onChange={handleCheckboxToggle}
            inputProps={{ 'aria-label': 'controlled' }}
          />        
        </Grid>

        <Grid item xs={9} sx={{width: "100ch", overflow: "hidden"}}>
          <Typography variant="subtitle1" color="text.secondary" component="div" noWrap >
            {email.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" noWrap >
          {email.subject}
          </Typography>
          <Typography color="text.secondary" component="div" noWrap >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit eum fuga esse deserunt animi eligendi neque quas cumque sed. In quaerat tempora voluptatum quod consequuntur voluptates magnam cum ea porro.
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={1} sx={{width: "10ch"}} >
          <Typography variant="subtitle1" color="text.secondary" component="div"
            sx={{ justifyContent: "end", alignItems:"center", textAlign: "end" }}
          >
            Hora
          </Typography>
          <Box sx={{display: 'flex', justifyContent: "end", alignItems: "center", pl: 1, pb: 1}}>
            <AvatarGroup max={3} >
              {email.users.map( (user, index) => 
                <Avatar key={`${user,index}`} sx={{boxShadow: "inset 0 0 10px gold"}}
                  alt={user} src={`https://avatars.dicebear.com/api/initials/${user}.svg`}
                />
              )}    
            </AvatarGroup>         
          </Box>
        </Grid>
    
      </Grid> 
      </CardContent>
    </Card>
  )}
 
  if(selectedEmails.length >= 1 || onHover){
   return <EmailHover key={`email${index}`} />
  } else return <EmailNormal key={`email${index}`} />
  
}

function EmptyEmailList() {

  return (
    <Box
      sx={{        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 1
      }}
    >
      <Typography variant="h4" color="text.secondary" component="div" noWrap>
        Você não tem emails!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" component="div" noWrap >
        Selecione outro item do menu
      </Typography>
    </Box>
  )
}

function ErrorMessage() {

  return (
    <Box
      sx={{        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 1
      }}
    >
      <Typography variant="h4" color="text.secondary" component="div" noWrap>
        Ocorreu um erro!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" component="div" noWrap >
        Recarregue a página ou tente mais tarde
      </Typography>
    </Box>
  )
}

export default function Emails( {emails, setEmails, selectedEmails, setSelectedEmails} ) {
  
  const { selectedMenu } = useContext(AppContext);

  const [requestError, setRequestError] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const getData = async () => {
    if(selectedMenu === undefined) return;
    
    const res = await fetch(`https://my-json-server.typicode.com/workinideas/vagafrontendteste/items/${selectedMenu}`);
    const data = await res.json();

    if(res.ok){
      setEmails(data.subMenuItems);
      setRequestError(false);
    } else setRequestError(true);

    setFirstRender(false);
    setSelectedEmails([]);
  }

  const PopulateEmailList = () => emails.map( (email, index) => Email(email, index, selectedEmails, setSelectedEmails) );

  useEffect(() => {    
    getData();
  },[selectedMenu])

  if(requestError) return <ErrorMessage />

  return (
    <>    
      {emails.length < 1
        ? firstRender ? <Loading /> : <EmptyEmailList />
        : <PopulateEmailList />
      }
    </>
  )
}