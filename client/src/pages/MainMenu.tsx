import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './homePage/Home';
import { Grid   } from '@mui/material';
import DataCapturePanel from './dataCapturePage/DataCapturePanel';
import Predictions from './predictionPage/Predictions';
import Metrics from './Metrics';

export default function ClippedDrawer() {

  const pagesLinks = ['/', 'dataCapture', 'dataPrediction', 'dataMetrics'];

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'radial-gradient(circle, rgba(24,54,15,1) 0%, rgba(10,75,35,1) 100%);' }}>
        <Toolbar disableGutters={true} >
          <Typography style={{color: 'rgb(173, 230, 185)'}} fontSize={{
              lg: 40,
              md: 20,
              sm: 15,
              xs: 20
            }} noWrap component="div">
            Costa Rica, Solar Panel Detector
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container style={{marginTop: '6vh'}} spacing={2}>
      <>{['Home', 'Capture', 'Prediction', 'Metrics'].map((text, index) => (
        <Grid key={`${index}GridMainMenu`} item xs={3} sm={3}>
                <ListItem key={text} disablePadding>
                  <ListItemButton dense selected={true}component={Link} to={`${pagesLinks[index]}`}>
                    <ListItemText disableTypography primary={<Typography fontSize={{
              lg: 20,
              md: 10,
              sm: 7,
              xs: 15
            }} style={{color: 'rgb(173, 230, 185)'}}>{text}</Typography>} />
                  </ListItemButton>
                </ListItem>
                </Grid>
              ))}</>
          <Grid item xs={12} style={{ marginTop: '5vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dataCapture" element={<DataCapturePanel />} />
              <Route path="/dataPrediction" element={<Predictions />} />
              <Route path="/dataMetrics" element={<Metrics />} />
            </Routes>
          </Grid>
          </Grid>

      </>
  );
}
