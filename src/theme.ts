import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: { main: '#0076bb' },
    secondary: { main: '#1e2b35' },
    background: {
        default: '#3f4c64',
        paper: '#1e2b35'
    },
    text: {
        primary: '#fff',
        secondary: '#aaa'
    }

  },
  typography: { fontFamily: 'Inter, system-ui, sans-serif' },
  shape: { borderRadius: 8 },
});

export default theme;