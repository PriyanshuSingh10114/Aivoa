import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: 24, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' },
    h2: { fontSize: 20, fontWeight: 600, color: '#111827', letterSpacing: '-0.01em' },
    h6: { fontSize: 16, fontWeight: 600, color: '#111827' },
    subtitle1: { fontSize: 14, fontWeight: 600, color: '#1F2937' },
    subtitle2: { fontSize: 14, fontWeight: 500, color: '#4B5563' },
    body1: { fontSize: 14, color: '#1F2937', lineHeight: 1.5 },
    body2: { fontSize: 13, color: '#4B5563', lineHeight: 1.5 },
    caption: { fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' },
  },
  palette: {
    primary: { main: '#2563EB', light: '#3B82F6', dark: '#1D4ED8', contrastText: '#FFFFFF' },
    success: { main: '#22C55E', light: '#86EFAC', dark: '#15803D' },
    warning: { main: '#F59E0B', light: '#FDE68A', dark: '#B45309' },
    error: { main: '#EF4444', light: '#FCA5A5', dark: '#B91C1C' },
    background: { default: '#F8FAFC', paper: '#FFFFFF' },
    divider: '#E5E7EB',
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 13,
          boxShadow: 'none',
          padding: '6px 16px',
          '&:hover': { boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          border: '1px solid #E5E7EB',
          backgroundImage: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px',
          '&:last-child': { paddingBottom: '16px' },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': { fontSize: 14 },
          '& .MuiInputLabel-root': { fontSize: 14 },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: '#FFFFFF', borderRadius: 6 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontSize: 12, height: 24, fontWeight: 500 },
      },
    },
  },
});
