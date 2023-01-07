import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Routes, Route, Link } from "react-router-dom";
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
  const languageMode = React.useMemo(
    () => ({
      toggleLanguageMode: () => {
        setMode((prevMode) => (prevMode === 'english' ? 'spanish' : 'english'));
      },
    }),
    [],
  );

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ background: '#faf3dd' }}>
        <Toolbar disableGutters >

          <Typography style={{ color: '#476930' }} fontSize={{
            lg: 40,
            md: 20,
            sm: 15,
            xs: 15
          }} fontFamily={'Segoe UI'} sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' }, fontWeight: 'bold' }} noWrap component="div">
            Costa Rica, Solar Panel Detector
          </Typography>
          <Box sx={{ display: { xs: 'block', sm: 'block' } }}>
            <IconButton sx={{ ml: 1 }} onClick={languageMode.toggleLanguageMode} color="inherit">
              {mode === 'english' ? <Typography
                fontSize={{
                  lg: 25,
                  md: 15,
                  sm: 15,
                  xs: 10
                }}
                style={{ color: 'blue' }}>{'English'}</Typography> : <Typography
                  fontSize={{
                    lg: 25,
                    md: 15,
                    sm: 15,
                    xs: 10
                  }}
                  style={{ color: '#476930' }}>{'English'}</Typography>}
            </IconButton>
            <IconButton sx={{ ml: 1 }} onClick={languageMode.toggleLanguageMode} color="inherit">
              {mode === 'spanish' ? <Typography fontSize={{
                lg: 25,
                md: 15,
                sm: 15,
                xs: 10
              }}
                style={{ color: 'blue' }}>{'Spanish'}</Typography> : <Typography fontSize={{
                  lg: 25,
                  md: 15,
                  sm: 15,
                  xs: 10
                }}
                  style={{ color: '#476930' }}>{'Spanish'}</Typography>}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container style={{ marginTop: '5vh' }} spacing={2}>
        <>{['Home', 'Capture', 'Prediction', 'Info'].map((text, index) => (
          <Grid key={`${index}GridMainMenu`} item xs={3} sm={3}>
            <ListItem key={text} disablePadding>
              <ListItemButton alignItems={'center'} selected={true} component={Link} to={`${pagesLinks[index]}`}>
                <ListItemText primary={<Typography fontSize={{
                  lg: 30,
                  md: 10,
                  sm: 7,
                  xs: 15
                }} style={{ color: '#faf3dd' }} fontFamily={'Segoe UI'} sx={{ fontWeight: 'bold' }} align={'center'}>{text}</Typography>} />
              </ListItemButton>
            </ListItem>
          </Grid>
        ))}</>
        <Grid item xs={12} >
          <LanguageContext.Provider value={mode}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dataCapture" element={<DataCapturePanel />} />
              <Route path="/dataPrediction" element={<Predictions />} />
              <Route path="/info" element={<Info />} />
            </Routes>
          </LanguageContext.Provider>
        </Grid>
      </Grid>

    </>
  );
}
