import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './Home';
import { Grid } from '@mui/material';
import DataCapturePanel from './dataCapturePage/DataCapturePanel';
import { teal } from '@mui/material/colors';
import Predictions from './Predictions';
import Metrics from './Metrics';

const drawerWidth = 240;

export default function ClippedDrawer() {

  const pagesLinks = ['/','dataCapture', 'dataPrediction', 'dataMetrics'];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , background: teal['600']}}>
        <Toolbar>
          <Typography variant="h4" noWrap component="div">
          Costa Rica, Solar Panel Detector
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Home','Data Capture', 'Data Prediction', 'Data Metrics'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={`${pagesLinks[index]}`}>
                  <ListItemText disableTypography primary={<Typography variant="h5">{text}</Typography>} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container>
          <Grid item xs={12} style={{marginTop: '5vh'}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dataCapture" element={<DataCapturePanel />} />
              <Route path="/dataPrediction" element={<Predictions />} />
              <Route path="/dataMetrics" element={<Metrics />} />
            </Routes>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
