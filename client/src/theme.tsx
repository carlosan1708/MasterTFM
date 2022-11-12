import {  grey } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        mode: 'dark',
          divider: grey[200],
          text: {
            primary: grey[50],
            secondary: grey[50],
          },
      },
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