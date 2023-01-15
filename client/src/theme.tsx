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
        mode: 'light',
          divider: grey[200],
          text: {
            primary: '#000',
            secondary: grey[50],
          },
          info: {main: '#DFF5CE'},
          success: {main: '#FFE77AFF'},
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: '#C0C0C0',
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            },
          },
        }

      }
});

// Main legend
theme.typography.h3 = {
  fontSize: '3rem',
  '@media (min-width:700px)': {
    fontSize: '30rem',
  }
};

// Title
theme.typography.h4 = {
  fontSize: '2rem',
  '@media (min-width:700px)': {
    fontSize: '3rem',
  }
};

//Submenus
theme.typography.h5 = {
  fontSize: '0.5rem',
  '@media (min-width:700px)': {
    fontSize: '1.5rem',
  }
};



theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

theme = responsiveFontSizes(theme)
export default theme;