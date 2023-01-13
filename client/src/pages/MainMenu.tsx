import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Home } from './homePage/Home';
import { Box, Grid, IconButton } from '@mui/material';
import DataCapturePanel from './dataCapturePage/DataCapturePanel';
import Predictions from './predictionPage/Predictions';
import Info from './infoPage/Info';
import React from 'react';

export const LanguageContext = React.createContext({});

export default function ClippedDrawer() {
  const pagesLinks = ['/', 'dataCapture', 'dataPrediction', 'info'];

  const [mode, setMode] = React.useState<'english' | 'spanish'>('english');
  const location = useLocation()

  const languageMode = React.useMemo(
    () => ({
      toggleLanguageMode: () => {
        setMode((prevMode) => (prevMode === 'english' ? 'spanish' : 'english'));
      },
    }),
    [],
  );

  const listBasedLanguage = () => {
    if (mode === 'english') {
      return ['Home', 'Capture', 'Prediction', 'Info']
    } else {
      return ['Principal', 'Captura', 'Prediccion', 'Info']
    }
  }

  const AppBarHoc: React.FC<any> = (props) => {
    const { children } = props;

    return (
      <div>
        {location.pathname === '/' ?
          <AppBar position="fixed" sx={{ height: '7vh', backgroundColor: 'transparent' }}>
            {children}
          </AppBar>
          :
          <AppBar position="static" sx={{ height: '7vh', backgroundColor: 'white' }}>
            {children}
          </AppBar>
        }
      </div>
    );
  };


  const MenuToolBar = () => {
    return (
      <Toolbar >
        <Grid container justifyContent="flex-end">
          <Grid item xs={4} sm={5}>
          {location.pathname === '/' ?
            <Typography style={{ color: 'white' }} fontSize={{
              lg: 40,
              md: 20,
              sm: 15,
              xs: 12
            }} sx={{ fontWeight: 'bold' }} component="div">
              Costa Rica, Solar Panel Detector
            </Typography> :
              <Typography style={{ color: '#0c262b' }} fontSize={{
                lg: 40,
                md: 20,
                sm: 15,
                xs: 12
              }} sx={{ fontWeight: 'bold' }} component="div">
                Costa Rica, Solar Panel Detector
              </Typography>
            }
          </Grid>
          <Grid container item xs={7} sm={5} justifyContent="center"  >
            <>{listBasedLanguage().map((text, index) => (
              <Grid item xs={3} sm={3}>
                <ListItem key={text} disablePadding >
                  {(location.pathname === '/' && index === 0)
                    || location.pathname.substring(1).includes(pagesLinks[index]) ?
                    <ListItemButton alignItems={'center'} component={Link} to={`${pagesLinks[index]}`}>
                      {location.pathname !== '/' ? 
                      <ListItemText primary={<Typography fontSize={{
                        lg: 20,
                        md: 10,
                        sm: 10,
                        xs: 10
                      }} style={{ color: '#0c262b' }} sx={{ fontWeight: 'bold' }} align={'center'}>
                        {text}
                      </Typography>} />
                      : 
                      <ListItemText primary={<Typography fontSize={{
                        lg: 20,
                        md: 10,
                        sm: 10,
                        xs: 10
                      }} style={{ color: 'white' }} sx={{ fontWeight: 'bold' }} align={'center'}>
                        {text}
                      </Typography>} />
                      }

                    </ListItemButton>
                    :
                    <ListItemButton alignItems={'center'} component={Link} to={`${pagesLinks[index]}`}>
                      <ListItemText primary={<Typography fontSize={{
                        lg: 20,
                        md: 10,
                        sm: 10,
                        xs: 10
                      }} style={{ color: 'black' }} sx={{ fontWeight: 'bold' }} align={'center'}>
                        {text}
                      </Typography>} />
                    </ListItemButton>
                  }
                </ListItem>
              </Grid>
            ))}</>
          </Grid>
          <Grid item xs={1} sm={2} container justifyContent="flex-end">
            <IconButton sx={{ ml: 1 }} onClick={languageMode.toggleLanguageMode} color="inherit">
              {mode === 'english' ? <Typography
                fontSize={{
                  lg: 20,
                  md: 15,
                  sm: 15,
                  xs: 10
                }}
                style={{ color: 'blue' }}>{'English'}</Typography> : <Typography
                  fontSize={{
                    lg: 20,
                    md: 15,
                    sm: 15,
                    xs: 10
                  }}
                  style={{ color: 'black' }}>{'English'}</Typography>}
            </IconButton>
            <IconButton sx={{ ml: 1 }} onClick={languageMode.toggleLanguageMode} color="inherit">
              {mode === 'spanish' ? <Typography fontSize={{
                lg: 20,
                md: 15,
                sm: 15,
                xs: 10
              }}
                style={{ color: 'blue' }}>{'Spanish'}</Typography> : <Typography fontSize={{
                  lg: 20,
                  md: 15,
                  sm: 15,
                  xs: 10
                }}
                  style={{ color: 'black' }}>{'Spanish'}</Typography>}
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    )
  }
  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarHoc>
          <MenuToolBar />
        </AppBarHoc>
      </Box>
      <LanguageContext.Provider value={mode}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dataCapture" element={<DataCapturePanel />} />
          <Route path="/dataPrediction" element={<Predictions />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </LanguageContext.Provider>
    </>
  );
}
