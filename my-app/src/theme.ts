import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: { main: '#251258' },
    secondary: { main: '#8e0cc2' },
    background: {
        default: '#3f3f64',
        paper: '#28283f'
    },
    text: {
        primary: '#fff',
    }

  },
  typography: { fontFamily: 'Inter, system-ui, sans-serif' },
  shape: { borderRadius: 8 },
});

export default theme;