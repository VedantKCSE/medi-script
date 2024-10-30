import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800000', // Maroon color
    },
    background: {
      default: '#FFFFFF', // White background
    },
    text: {
      primary: '#000000', // Black text for better contrast
    },
  },
});

export default theme;
