import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';

import AppContext from '../src/AppContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  //***Global States***
  //Handle selection of email list to be displayed
  const [selectedMenu, setSelectedMenu] = React.useState();
  //Handle closing mobile menu on item click
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  //Handle displaying loading progress circle
  const [isLoadingEmails, setIsLoadingEmails] = React.useState(true);
  //True when user is logged
  const [isAuth, setIsAuth] = React.useState(false);
  //Dark mode handlers
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch invokes this method
      toggleColorMode: () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
      },
    }),
  [],);
  //Language selector
  const [languageSelected, setLanguageSelected] = React.useState('br');

  const secondaryColorChanger = () => {
    if(mode === 'light')
    { 
      return '#ededed'
    } else return '#424242';
  }

  //MUI Theme
  const theme =  React.useMemo(() =>
    createTheme({
      palette: {
        mode: mode,
        primary: {
          main: '#556cd6',
        },
        secondary: {          
          main: secondaryColorChanger(),     
        },
        error: {
          main: '#f44336',
        },    
      },
    })
  ,[mode]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppContext.Provider 
        value={
          {
            selectedMenu,
            setSelectedMenu,
            isMobileMenuOpen,
            setIsMobileMenuOpen,
            isLoadingEmails,
            setIsLoadingEmails,
            isAuth,
            setIsAuth,
            colorMode,
            languageSelected,
            setLanguageSelected
          }
        }
      >
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppContext.Provider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};