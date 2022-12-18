import {  grey } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        mode: 'dark',
          divider: grey[200],
          text: {
            primary: '#77a69d',
            secondary: grey[50],
          },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: 'radial-gradient(circle, rgba(24,54,15,1) 0%, rgba(10,75,35,1) 100%);',
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