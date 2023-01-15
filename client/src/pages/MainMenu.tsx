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
          <AppBar position="fixed" sx={{  backgroundColor: 'transparent' }}>
            {children}
          </AppBar>
          :
          <AppBar position="static" sx={{  backgroundColor: 'white' }}>
            {children}
          </AppBar>
        }
      </div>
    );
  };


  const MenuToolBar = () => {
    return (
      <Toolbar disableGutters >
        <Grid container alignItems="center" justifyContent="flex-end" style={{padding: '1rem'}}>
          <Grid item xs={6} sm={5}>
          {location.pathname === '/' ?
            <Typography style={{ color: 'white' }} variant={'h4'} sx={{ fontWeight: 'bold' }} component="div">
              Costa Rica, Solar Panel Detector
            </Typography> :
              <Typography style={{ color: '#0c262b' }} variant={'h4'} sx={{ fontWeight: 'bold' }} component="div">
                Costa Rica, Solar Panel Detector
              </Typography>
            }
          </Grid>
          <Grid container item xs={6} sm={5} justifyContent="center"  >
            <>{listBasedLanguage().map((text, index) => (
              <Grid item xs={3} sm={3}>
                <ListItem key={text} disablePadding >
                  {(location.pathname === '/' && index === 0)
                    || location.pathname.substring(1).includes(pagesLinks[index]) ?
                    <ListItemButton alignItems={'center'} component={Link} to={`${pagesLinks[index]}`}>
                      {location.pathname !== '/' ? 
                      <ListItemText primary={<Typography variant={'h5'}  style={{ color: 'blue' }} sx={{ fontWeight: 'bold' }} align={'center'}>
                        {text}
                      </Typography>} />
                      : 
                      <ListItemText primary={<Typography variant={'h5'} style={{ color: 'white' }} sx={{ fontWeight: 'bold' }} align={'center'}>
                        {text}
                      </Typography>} />
                      }

                    </ListItemButton>
                    :
                    <ListItemButton alignItems={'center'} component={Link} to={`${pagesLinks[index]}`}>
                      <ListItemText primary={<Typography variant={'h5'} style={{ color: 'black' }} sx={{ fontWeight: 'bold' }} align={'center'}>
                        {text}
                      </Typography>} />
                    </ListItemButton>
                  }
                </ListItem>
              </Grid>
            ))}</>
          </Grid>
          <Grid item xs={12} sm={2} container justifyContent="flex-end">
            <Grid item xs={6}>
            <IconButton sx={{ ml: 1 }} onClick={languageMode.toggleLanguageMode} color="inherit">
              {mode === 'english' ? <Typography
                variant={'h5'}
                style={{ color: 'blue' }}>{'English'}</Typography> : <Typography
                variant={'h5'}
                  style={{ color: 'black' }}>{'English'}</Typography>}
            </IconButton>
            </Grid>
            <Grid item xs={6}>
            <IconButton sx={{ ml: 1 }} onClick={languageMode.toggleLanguageMode} color="inherit">
              {mode === 'spanish' ? <Typography variant={'h4'}
                style={{ color: 'blue' }}>{'Spanish'}</Typography> : <Typography variant={'h5'}
                  style={{ color: 'black' }}>{'Spanish'}</Typography>}
            </IconButton>
            </Grid>
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
