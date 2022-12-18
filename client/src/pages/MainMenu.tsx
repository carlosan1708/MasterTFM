import * as React from 'react';
import Box from '@mui/material/Box';
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
import { CSSObject, Grid, IconButton,makeStyles,styled, Theme, useMediaQuery, useTheme  } from '@mui/material';
import DataCapturePanel from './dataCapturePage/DataCapturePanel';
import { teal } from '@mui/material/colors';
import Predictions from './predictionPage/Predictions';
import Metrics from './Metrics';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 10px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 100px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function ClippedDrawer() {

  const pagesLinks = ['/', 'dataCapture', 'dataPrediction', 'dataMetrics'];
  const theme = useTheme();
  const matchesUp = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(matchesUp);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'radial-gradient(circle, rgba(24,54,15,1) 0%, rgba(10,75,35,1) 100%);' }}>
        <Toolbar disableGutters={true} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{color: 'rgb(173, 230, 185)'}}variant="h2" noWrap component="div">
            Costa Rica, Solar Panel Detector
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer  PaperProps={{
    sx: {
      background: 'radial-gradient(circle, rgba(24,54,15,1) 0%, rgba(10,75,35,1) 100%);'
    }
  }} variant="permanent" open={open} >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }} style={{color: 'rgb(173, 230, 185)'}}>
       
          <List>
            {open ?
              <>{['Home', 'Capture', 'Prediction', 'Metrics'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton component={Link} to={`${pagesLinks[index]}`}>
                    <ListItemText disableTypography primary={<Typography variant="h4">{text}</Typography>} />
                  </ListItemButton>
                </ListItem>
              ))}
              <IconButton onClick={handleDrawerOpen}>
              <Typography fontSize={{
              lg: 30,
              md: 20,
              sm: 15,
              xs: 10
            }}
            style={{color: 'rgb(173, 230, 185)'}}> Hide</Typography> {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            </>
              : <IconButton onClick={handleDrawerOpen}>
              <Typography fontSize={{
              lg: 30,
              md: 20,
              sm: 15,
              xs: 10
            }} noWrap component="div">
             <Typography fontSize={{
              lg: 30,
              md: 20,
              sm: 15,
              xs: 10
            }} style={{color: 'rgb(173, 230, 185)'}}> Menu</Typography> {!open && <ChevronLeftIcon />  }
          </Typography>
            </IconButton>
            }
          
          </List>
          
          <Divider />
        </Box>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <Grid container >
          <Grid item xs={12} style={{ marginTop: '5vh' }}>
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
