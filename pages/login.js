import { useContext, useState } from 'react';
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

export default function Login() {
  const { isAuth, setIsAuth } = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  // const handleSubmit = () => {handleAuthentication(username, (arg) => setIsAuth(arg), navigateToHome ); }
  const handleAuth = () => {
    if(username === 'admin' && password === 'admin') {
      setIsAuth(true);
      Router.push('/')
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
