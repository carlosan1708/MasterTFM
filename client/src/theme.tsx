import {  grey } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
    palette: {
        mode: 'dark',
          divider: grey[200],
          text: {
            primary: '#77a69d',
            secondary: grey[50],
          },
          info: {main: '#DFF5CE'},
          success: {main: '#FFE77AFF'},
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: 'linear-gradient(90deg, rgba(24,54,15,1) 0%, rgba(67,116,104,1) 17%, rgba(28,96,54,1) 100%)',
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            },
          },
        }

      }
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

theme = responsiveFontSizes(theme)
export default theme;