import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Button,
 } from '@mui/material';

import Link from '../src/Link';
import AppContext from '.././src/AppContext';

//Get cookie on server side
export function getServerSideProps( {req, res} ) {
  return {
    props: { isAuthCookie: req.cookies.isAuth ?? ""}, // will be passed to the page component as props
  }
};

export default function Login(props) {
  const { isAuth, setIsAuth } = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const handleAuth = () => {
    if(username === 'admin' && password === 'admin') {
      //Create a cookie to save session
      document.cookie = "isAuth=true; path=/";
      setIsAuth(true);
      Router.push('/');
    }
    if(username != 'admin') {
      setUsernameErr(true);
      setTimeout(() => {
        setUsernameErr(false);
      }, 1500);
    }
    if(password != 'admin') {
      setPasswordErr(true);
      setTimeout(() => {
        setPasswordErr(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if(props.isAuthCookie){
      setIsAuth(true);
    }
  },[])

  useEffect(() => {
    if(isAuth){
      Router.push('/');
    }
  },[isAuth])

  if(isAuth){
    return <div></div> 
  }

  return (
    <Grid
    container
    spacing={3}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
  >     

    <Grid item>   
      <TextField
        id="sign-in"
        autoFocus={true}
        label="Nome de usuário"
        error={usernameErr}
        helperText={usernameErr ? 'O usuário é "admin"' : null}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={ (e) => {if(e.code === "Enter" || e.code === "NumpadEnter" ) handleAuth()} }     
      />    
    </Grid>

    <Grid item>   
      <TextField
        id="sign-in"
        autoFocus={false}
        label="Senha"
        error={passwordErr}
        helperText={passwordErr ? 'A senha é "admin"' : null}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={ (e) => {if(e.code === "Enter" || e.code === "NumpadEnter" ) handleAuth()}}     
      />    
    </Grid>  

    <Grid item>
      <Button variant="contained"                    
        onClick={handleAuth}
      >Entrar</Button>
    </Grid>          

    <Grid item>
      {/* <Link to="/signup" > Ainda não tem uma conta? Cadastre-se! </Link> */}
    </Grid>
      
    
    </Grid>
  )
}
