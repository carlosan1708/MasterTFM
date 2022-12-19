import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './homePage/Home';
import { Grid } from '@mui/material';
import DataCapturePanel from './dataCapturePage/DataCapturePanel';
import Predictions from './predictionPage/Predictions';
import Info from './Info';

export default function ClippedDrawer() {

  const pagesLinks = ['/', 'dataCapture', 'dataPrediction', 'info'];

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ background: '#faf3dd' }}>
        <Toolbar disableGutters={true} >
          <Typography style={{ color: '#476930' }} fontSize={{
            lg: 40,
            md: 20,
            sm: 15,
            xs: 20
          }} fontFamily={'Segoe UI'} sx={{ fontWeight: 'bold' }} noWrap component="div">
            Costa Rica, Solar Panel Detector
          </Typography>
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dataCapture" element={<DataCapturePanel />} />
            <Route path="/dataPrediction" element={<Predictions />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </Grid>
      </Grid>

    </>
  );
}
