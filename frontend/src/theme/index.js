import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: '#0F52BA', // Sapphire Blue
    },
    secondary: {
      main: '#FF7F50', // Coral
    },
    background: {
      default: '#F4F7FE',
      paper: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(15, 82, 186, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: 16,
        },
      },
    },
  },
});
